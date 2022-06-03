import re
from typing import List, Optional

import mysql.connector
from mysql.connector.cursor import MySQLCursorDict

from models.enums.sorting_mode import SortingMode
from word_marker.word_marker import WordMarker


class DatabaseRepository:
    def __init__(
            self,
            dbhost="localhost",
            dbuser="root",
            dbpass="",
            dbname="",
            db_config: Optional[dict] = None,
    ) -> None:
        if db_config is None:
            self.db_config = {
                "host": dbhost,
                "user": dbuser,
                "database": dbname,
                "password": dbpass,
            }
        else:
            self.db_config = db_config

    def get_movies(
            self, only_movies: Optional[bool] = None, table_name="movies"
    ) -> List[dict]:
        db = mysql.connector.connect(**self.db_config)
        cursor: MySQLCursorDict = db.cursor(dictionary=True)

        """Get movies from database

        Args:
            only_movies (bool, optional): If only_movies is None return all data. Otherwise return only movies or series.
            table_name (str, optional): Only for debbuging. Defaults to "movies".
        Returns:
            list[dict]: List of data from database
        """
        if only_movies is None:
            cursor.execute(f"SELECT * FROM {table_name};")
        else:
            cursor.execute(
                f"SELECT * FROM {table_name} WHERE type=%s;",
                ("movie" if only_movies else "serie",),
            )

        data = cursor.fetchall()

        cursor.reset()
        cursor.close()
        return data

    def get_lyrics(
            self,
            searched_phrase: str,
            main_language: str,
            translation_language: str,
            sorting_mode: SortingMode,
            only_movies: Optional[bool] = None,
            movie: Optional[str] = None,
            table_name="lyrics",
    ) -> dict:
        """Get lyrics from database

        Args:
            searched_phrase (str):
            main_language (str):
            translation_language (str):
            sorting_mode (SortingMode):
            only_movies (Optional[bool]): If only_movies is None return all data. Otherwise return only movies or series. Defaults to None.
            movie (Optional[str] = None): Get lyrics for only provided movie
            table_name (str, optional): Only for debugging. Defaults to "lyrics".

        Returns:
            dict: Dicts with keys main_results and similar_results
        """
        db = mysql.connector.connect(**self.db_config)
        cursor: MySQLCursorDict = db.cursor(dictionary=True)

        # Get all lyrics
        regexp_querry = f"SELECT {table_name}.id, movie_id_fk, episode_id_fk, seconds, {table_name}.{main_language}, {table_name}.{translation_language} FROM {table_name}"
        if movie is not None:
            regexp_querry += f" INNER JOIN movies ON movies.id = {table_name}.episode_id_fk WHERE movies.movie = '{movie}' AND"
        elif only_movies is not None:
            regexp_querry += (
                f" WHERE episode_id_fk IS {'' if only_movies else 'NOT'} NULL AND"
            )
        else:
            regexp_querry += f" WHERE "

        regexp_querry += f" {table_name}.{main_language} IS NOT NULL AND {table_name}.{translation_language} IS NOT NULL"

        cursor.execute(regexp_querry)
        all_data = cursor.fetchall()

        # Get all rows with translated sentence
        all_data = list(filter(lambda x: x[translation_language] is not None, all_data))

        # Get main results
        r = re.compile(rf"\b{searched_phrase}\b[^']")
        main_results = list(
            filter(lambda x: r.search(x[main_language].lower()), all_data)
        )

        # FIXME: This is very slow
        # all_data = [x for x in all_data if x not in main_results]

        # Mark main_results
        for result in main_results:
            result[main_language] = WordMarker.mark_word(result[main_language], r)

        # Get similiar results
        if len(searched_phrase) == 4:
            r = re.compile(
                rf"\b\S{searched_phrase}\S*|\b\S?{searched_phrase}?[^{searched_phrase[-1]}.,?! ]\S*"
            )
        elif len(searched_phrase) > 4:
            r = re.compile(
                rf"\b\S{searched_phrase}\S*|\b\S?{searched_phrase}?[^{searched_phrase[-1]}.,?! ]\S*|\b{searched_phrase[0:-1]}\b",
            )
        else:
            r = re.compile(
                rf"\b\S{searched_phrase}\S?[^\s]*|\b\S?{searched_phrase}[^.,?! ][^\s]*",
            )

        similar_results = list(
            filter(lambda x: r.search(x[main_language].lower()), all_data)
        )

        # Mark similiar
        for result in similar_results:
            result[main_language] = WordMarker.mark_word(result[main_language], r)

        # Sort resulsts
        if sorting_mode is SortingMode.BEST_MATCH:
            main_results = sorted(
                main_results,
                key=lambda x: self._best_match_sort_key(
                    x[main_language], x[translation_language]
                ),
            )
            similar_results = sorted(
                similar_results,
                key=lambda x: self._best_match_sort_key(
                    x[main_language], x[translation_language]
                ),
            )
        else:
            reverse = False if sorting_mode is SortingMode.SHORTESTS else True
            main_results = sorted(
                main_results, key=lambda x: len(x[main_language]), reverse=reverse
            )
            similar_results = sorted(
                similar_results, key=lambda x: len(x[main_language]), reverse=reverse
            )

        cursor.reset()
        cursor.close()
        return {
            "main_results": main_results[:100],
            "similar_results": similar_results[:100],
        }

    def _best_match_sort_key(self, main_lang, translation_lang):
        return (
            abs(len(main_lang) - len(translation_lang)),
            abs(round(len(main_lang) / 10) * 10 - 25),
        )

    def get_random_lyric(self, main_lang, translation_lang, lang_length):
        db = mysql.connector.connect(**self.db_config)
        cursor: MySQLCursorDict = db.cursor(dictionary=True)

        cursor.execute(
            f"SELECT id, seconds, movie_id_fk, episode_id_fk, {main_lang}, {translation_lang} FROM lyrics WHERE LENGTH({main_lang}) = LENGTH({translation_lang});"
        )

        data = cursor.fetchall()

        cursor.reset()
        cursor.close()

        return data

    def get_random_lyric_without_quality(self):
        db = mysql.connector.connect(**self.db_config)
        cursor: MySQLCursorDict = db.cursor(dictionary=True)

        cursor.execute(
            f"SELECT id, en, pl, de, es, fr, pt, it FROM lyrics WHERE abs(LENGTH(pl)-LENGTH(en))<10 AND quality IS Null;"
        )

        data = cursor.fetchall()

        cursor.reset()
        cursor.close()

        return data

    def set_lyric_quality(self, id, quality):
        db = mysql.connector.connect(**self.db_config)
        cursor: MySQLCursorDict = db.cursor(dictionary=True)

        cursor.execute(
            f"UPDATE lyrics SET quality = {quality} WHERE id = {id};"
        )

        data = cursor.fetchall()

        cursor.reset()
        cursor.close()

        return data

    def get_episodes(self, serie_name: str) -> List[dict]:
        """Get episodes from database

        Args:
            serie_name (str): Name of serie

        Returns:
            list[dict]: List of episodes
        """
        db = mysql.connector.connect(**self.db_config)
        cursor: MySQLCursorDict = db.cursor(dictionary=True)

        cursor.execute(
            "SELECT episodes.id, season, episode, movies.movie as 'movie' FROM episodes INNER JOIN movies ON episodes.movie_id_fk=movies.id WHERE movies.movie = %s;",
            (serie_name,),
        )
        return cursor.fetchall()

    def get_movie(
            self,
            movie_name: Optional[str] = None,
            movie_id: Optional[str] = None,
            table_name="movies",
    ) -> Optional[dict]:
        """Get one movie from database

        Args:
            movie_name (str): Name of movie in database

        Returns:
            Optional[dict]: Movie from database
        """
        db = mysql.connector.connect(**self.db_config)
        cursor: MySQLCursorDict = db.cursor(dictionary=True)

        query = f"SELECT * FROM {table_name} "

        if movie_name is not None:
            query += f"WHERE {table_name}.movie = %s"
            parameter = movie_name
        elif movie_id is not None:
            query += f"WHERE {table_name}.id = %s"
            parameter = movie_id
        else:
            cursor.reset()
            cursor.close()
            return None

        cursor.execute(query, (parameter,))
        movie_data = cursor.fetchone()
        if movie_data is not None:
            movie_data["id"] = movie_data["movie"]

        cursor.reset()
        cursor.close()
        return movie_data

    def get_episode(self, episode_id: int, table_name="episodes") -> Optional[dict]:
        """Get one episode from database

        Args:
            episode_id ([type], optional): Defaults to int.
            table_name (str, optional): Only for debugging. Defaults to "episodes".

        Returns:
            Optional[dict]: Episode from database
        """
        db = mysql.connector.connect(**self.db_config)
        cursor: MySQLCursorDict = db.cursor(dictionary=True)

        query = f"SELECT * FROM {table_name} WHERE id = %s;"
        cursor.execute(query, (episode_id,))

        data = cursor.fetchone()

        cursor.reset()
        cursor.close()
        return data
