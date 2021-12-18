from typing import Optional
import fastapi
from fastapi.exceptions import HTTPException
from models.request.find_lyrics_request import FindLyricsRequest
import repository
from models.enums.source import Source
from models.response.episode_model import ListEpisodeModel
from models.response.movie_model import ListMovieModel
import settings

app = fastapi.FastAPI(title="Lyricated API")
sett = settings.Settings()
db = repository.DatabaseRepository(
    dbhost=sett.dbhost, dbuser=sett.dbuser, dbpass=sett.dbpassword, dbname=sett.dbname
)

@app.get("/get_movies", response_model=ListMovieModel, description="Get list of movies from database")
async def get_movies(source: Optional[Source] = None):
    if source is None:
        only_movies = None
    else:
        only_movies = True if source == "only_movies" else False

    movies = db.get_movies(only_movies=only_movies)
    for movie in movies: 
        movie["id"] = movie["movie"]

    return {"movies": movies}

@app.get("/get_episodes", response_model=ListEpisodeModel, description="Get episodes for serie from database")
async def get_episodes(movie_id: str):
    # Validate movie_id
    series_id = [serie["movie"] for serie in db.get_movies(only_movies=False)]
    if movie_id not in series_id:
        raise HTTPException(status_code=400, detail="Provided movie_id doesn't match to any series id.")
    else:
        episodes = db.get_episodes(serie_name=movie_id)
        for episode in episodes:
            episode["movie_id"] = episode["movie"]
        return {"episodes": episodes}

@app.get("/find_lyrics")
async def find_lyrics(request: FindLyricsRequest):
    pass