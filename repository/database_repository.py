from typing import Optional
import mysql.connector
from mysql.connector.connection import MySQLConnection
from mysql.connector.cursor import MySQLCursorDict

class DatabaseRepository:
    def __init__(self, dbhost="localhost", dbuser="root", dbpass="", dbname="", db=Optional[MySQLConnection]) -> None:
        if db is None:
            self.db : MySQLConnection = mysql.connector.connect(host=dbhost, user=dbuser, database=dbname, password=dbpass)
        else:
            self.db = db
        
        self.cursor : MySQLCursorDict = self.db.cursor(dictionary=True)

    def get_movies(self, only_movies: Optional[bool] = None, table_name="movies") -> list[dict]:
        """Get movies from Database

        Args:
            only_movies (bool, optional): If only_movies is None return all data. Otherwise return only movies or series.

        Returns:
            list[dict]: List of data from database
        """
        if only_movies is None:
            self.cursor.execute(f"SELECT * FROM {table_name};")
        else:
            self.cursor.execute(f"SELECT * FROM {table_name} WHERE type=%s;", ("movie" if only_movies else "serie",))
    
        return list(self.cursor.fetchall())