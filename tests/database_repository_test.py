import unittest
import mysql.connector
from mysql.connector.connection import MySQLConnection
from mysql.connector.cursor import MySQLCursorDict

from repository.database_repository import DatabaseRepository

class TestDatabaseRepositoryGetMovies(unittest.TestCase):
    def setUp(self) -> None:
        self.db : MySQLConnection = mysql.connector.connect(host="localhost", user="root", password="", database="lyricated")
        self.cursor : MySQLCursorDict = self.db.cursor(dictionary=True)

        # Create temp tables
        self.cursor.execute("CREATE TEMPORARY TABLE tmp_movies SELECT * FROM movies WHERE movie IN ('AP13', 'TT', 'LD')")
        
        self.dbrepo = DatabaseRepository(db=self.db)

        return super().setUp()

    def test_getting_all_data(self):
        all_data = self.dbrepo.get_movies(table_name="tmp_movies")
        print(all_data)
        self.assertEqual(len(all_data), 3)


        movie_names = [data["movie"] for data in all_data]

        self.assertIn("AP13", movie_names)
        self.assertIn("TT", movie_names)
        self.assertIn("LD", movie_names)

    def test_getting_only_movies(self):
        all_movies = self.dbrepo.get_movies(only_movies=True, table_name="tmp_movies")
        self.assertEqual(len(all_movies), 2)
        
        movie_names = [data["movie"] for data in all_movies]

        self.assertIn("AP13", movie_names)
        self.assertIn("TT", movie_names)

    def test_getting_only_series(self):
        all_series = self.dbrepo.get_movies(only_movies=False, table_name="tmp_movies")
        self.assertEqual(len(all_series), 1)
        
        movie_names = [data["movie"] for data in all_series]

        self.assertIn("LD", movie_names)