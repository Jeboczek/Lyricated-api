from typing import Optional
import fastapi
import repository
from response_model.enums.source import Source
from response_model.movie_model import ListMovieModel, MovieModel
import settings

app = fastapi.FastAPI()
sett = settings.Settings()
db = repository.DatabaseRepository(
    dbhost=sett.dbhost, dbuser=sett.dbuser, dbpass=sett.dbpassword, dbname=sett.dbname
)

@app.get("/get_movies", response_model=ListMovieModel, description="Get list of movies from database")
def get_movies(source: Optional[Source] = None):
    pass
