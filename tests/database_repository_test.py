import unittest
import mysql.connector
from mysql.connector.connection import MySQLConnection
from mysql.connector.cursor import MySQLCursorDict

from repository.database_repository import DatabaseRepository
from models.enums.sorting_mode import SortingMode


class TestDatabaseRepositoryGetMovies(unittest.TestCase):
    def setUp(self) -> None:
        self.dbrepo = DatabaseRepository(dbname="lyricated")

        return super().setUp()

    def test_getting_all_data(self):
        all_data = self.dbrepo.get_movies()
        self.assertGreater(len(all_data), 0)

        movie_names = [data["movie"] for data in all_data]

        self.assertIn("AP13", movie_names)
        self.assertIn("TT", movie_names)
        self.assertIn("LD", movie_names)

    def test_getting_only_movies(self):
        all_movies = self.dbrepo.get_movies(only_movies=True)
        self.assertGreater(len(all_movies), 0)

        movie_names = [data["movie"] for data in all_movies]

        self.assertIn("AP13", movie_names)
        self.assertIn("TT", movie_names)

    def test_getting_only_series(self):
        all_series = self.dbrepo.get_movies(only_movies=False)
        self.assertTrue(len(all_series), 0)

        movie_names = [data["movie"] for data in all_series]

        self.assertIn("LD", movie_names)

    def test_getting_one_exists_movie(self):
        one_movie = self.dbrepo.get_movie("AP13")
        self.assertEqual(one_movie["movie"], "AP13")

    def test_getting_one_non_exists_movie(self):
        one_movie = self.dbrepo.get_movie("TEST")
        self.assertIs(one_movie, None)


class TestDatabaseRepositoryGetLyrics(unittest.TestCase):
    def setUp(self) -> None:
        self.dbrepo = DatabaseRepository(dbname="lyricated")
        return super().setUp()

    def test_getting_lyrics(self):
        lyrics = self.dbrepo.get_lyrics(
            "auto", "pl", "en", SortingMode.SHORTESTS
        )

        self.assertIn("main_results", lyrics.keys())
        self.assertIn("similiar_results", lyrics.keys())

        self.assertGreater(len(lyrics["main_results"]), 0)
        self.assertGreater(len(lyrics["similiar_results"]), 0)

        self.assertIn("pl", lyrics["main_results"][0].keys())
        self.assertIn("en", lyrics["main_results"][0].keys())

    def test_soring_lyrics(self):
        lyrics_shortests = self.dbrepo.get_lyrics(
            "auto", "pl", "en", SortingMode.SHORTESTS
        )
        lyrics_longests = self.dbrepo.get_lyrics(
            "auto", "pl", "en", SortingMode.LONGESTS
        )
        lyrics_bests = self.dbrepo.get_lyrics(
            "auto", "pl", "en", SortingMode.BEST_MATCH
        )

        shortests_len = len(lyrics_shortests["main_results"])
        longests_len = len(lyrics_longests["main_results"])
        bests_len = len(lyrics_bests["main_results"])

        self.assertEquals(shortests_len, longests_len)
        self.assertEquals(longests_len, bests_len)

        # Test shortests sorting
        last_lyric = None
        for lyric in lyrics_shortests["main_results"]:
            if last_lyric is None:
                last_lyric = lyric
                continue

            self.assertLessEqual(len(last_lyric["pl"]), len(lyric["pl"]))
            last_lyric = lyric

        # Test longests sorting
        last_lyric = None
        for lyric in lyrics_longests["main_results"]:
            if last_lyric is None:
                last_lyric = lyric
                continue

            self.assertGreaterEqual(len(last_lyric["pl"]), len(lyric["pl"]))
            last_lyric = lyric

    def test_getting_only_specific_type(self):
        only_movies_lyrics = self.dbrepo.get_lyrics(
            "auto",
            "pl",
            "en",
            SortingMode.LONGESTS,
            only_movies=True,
        )
        only_series_lyrics = self.dbrepo.get_lyrics(
            "auto",
            "pl",
            "en",
            SortingMode.LONGESTS,
            only_movies=False,
        )

        movies = [movie["id"] for movie in self.dbrepo.get_movies(only_movies=True)]
        series = [movie["id"] for movie in self.dbrepo.get_movies(only_movies=False)]

        for lyric in only_movies_lyrics["main_results"]:
            self.assertIn(lyric["movie_id_fk"], movies)

        for lyric in only_series_lyrics["main_results"]:
            self.assertIn(lyric["movie_id_fk"], series)

    def test_getting_only_specific_movie(self):
        lyrics = self.dbrepo.get_lyrics("auto", "pl", "en", SortingMode.BEST_MATCH, movie="KEP")
        movie_id = list(filter(lambda x: x["movie"] == "KEP", self.dbrepo.get_movies()))[0]["id"]

        for lyric in lyrics["main_results"]:
            self.assertEqual(lyric["movie_id_fk"], movie_id)

        for lyric in lyrics["similiar_results"]:
            self.assertEqual(lyric["movie_id_fk"], movie_id)