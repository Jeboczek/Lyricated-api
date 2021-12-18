from typing import Optional
from unittest.main import main
import mysql.connector
import re
from mysql.connector.connection import MySQLConnection
from mysql.connector.cursor import MySQLCursorDict

from .sorting_mode import SortingMode


class DatabaseRepository:
    def __init__(
        self,
        dbhost="localhost",
        dbuser="root",
        dbpass="",
        dbname="",
        db: Optional[MySQLConnection] = None,
    ) -> None:
        if db is None:
            self.db: MySQLConnection = mysql.connector.connect(
                host=dbhost, user=dbuser, database=dbname, password=dbpass
            )
        else:
            self.db = db

        self.cursor: MySQLCursorDict = self.db.cursor(dictionary=True)

    def get_movies(
        self, only_movies: Optional[bool] = None, table_name="movies"
    ) -> list[dict]:
        """Get movies from database

        Args:
            only_movies (bool, optional): If only_movies is None return all data. Otherwise return only movies or series.
            table_name (str, optional): Only for debbuging. Defaults to "movies".
        Returns:
            list[dict]: List of data from database
        """
        if only_movies is None:
            self.cursor.execute(f"SELECT * FROM {table_name};")
        else:
            self.cursor.execute(
                f"SELECT * FROM {table_name} WHERE type=%s;",
                ("movie" if only_movies else "serie",),
            )

        return list(self.cursor.fetchall())

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
            dict: Dicts with keys main_results and similiar_results
        """

        # Get all lyrics
        regexp_querry = f"SELECT {table_name}.id, movie_id_fk, episode_id_fk, seconds, {table_name}.{main_language}, {table_name}.{translation_language} FROM {table_name}"
        if movie is not None:
            regexp_querry += f" INNER JOIN movies ON movies.id = {table_name}.episode_id_fk WHERE movies.movie = '{movie}'"        
        elif only_movies is not None:
            regexp_querry += (
                f" WHERE episode_id_fk IS {'' if only_movies else 'NOT'} NULL"
            )

        self.cursor.execute(regexp_querry)
        all_data = self.cursor.fetchall()

        # Get main results
        r = re.compile(rf"\b{searched_phrase}\b[^']")
        main_results = list(
            filter(lambda x: r.search(x[main_language].lower()), all_data)
        )

        # Get similiar results
        searched_phrase = searched_phrase[0:-1]
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

        similiar_results = list(
            filter(lambda x: r.search(x[main_language].lower()), all_data)
        )

        # Sort resulsts
        if sorting_mode is SortingMode.BEST_MATCH:
            main_results = sorted(
                main_results,
                key=lambda x: self._best_match_sort_key(
                    x[main_language], x[translation_language]
                ),
            )
            similiar_results = sorted(
                similiar_results,
                key=lambda x: self._best_match_sort_key(
                    x[main_language], x[translation_language]
                ),
            )
        else:
            reverse = False if sorting_mode is SortingMode.SHORTESTS else True
            main_results = sorted(
                main_results, key=lambda x: len(x[main_language]), reverse=reverse
            )
            similiar_results = sorted(
                similiar_results, key=lambda x: len(x[main_language]), reverse=reverse
            )

        return {"main_results": main_results, "similiar_results": similiar_results}

    def _best_match_sort_key(self, main_lang, translation_lang):
        return (
            abs(len(main_lang) - len(translation_lang)),
            abs(round(len(main_lang) / 10) * 10 - 25),
        )

    def get_episodes(self, serie_name: str) -> list[dict]:
        """Get episodes from database

        Args:
            serie_name (str): Name of serie 

        Returns:
            list[dict]: List of episodes
        """
        self.cursor.execute("SELECT episodes.id, season, episode, movies.movie as 'movie' FROM episodes INNER JOIN movies ON episodes.movie_id_fk=movies.id WHERE movies.movie = %s;", (serie_name,))
        return self.cursor.fetchall()
