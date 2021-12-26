import re
from typing import Optional
import aioredis
import fastapi
from fastapi.exceptions import HTTPException
from models.request.find_lyrics_request import FindLyricsRequest
import repository
from models.enums.source import Source
from models.response.episode_model import ListEpisodeModel
from models.response.movie_model import ListMovieModel, MovieModel
from models.response.find_lyrics_model import FindLyricsModel
import settings
from reverso_context_api import Client
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache

from word_marker.word_marker import WordMarker

app = fastapi.FastAPI(title="Lyricated API")
sett = settings.Settings()
db = repository.DatabaseRepository(
    dbhost=sett.dbhost, dbuser=sett.dbuser, dbpass=sett.dbpassword, dbname=sett.dbname
)


@app.get(
    "/get_movies",
    response_model=ListMovieModel,
    description="Get list of movies from database",
)
def get_movies(source: Optional[Source] = None):
    if source is None:
        only_movies = None
    else:
        only_movies = True if source == "only_movies" else False

    movies = db.get_movies(only_movies=only_movies)
    for movie in movies:
        movie["id"] = movie["movie"]

    return {"movies": movies}


@app.get(
    "/get_movie",
    response_model=MovieModel,
    description="Get single movie from database"
)
def get_movie(movie_id: str):
    movie = db.get_movie(movie_name=movie_id)
    return movie    

@app.get(
    "/get_episodes",
    response_model=ListEpisodeModel,
    description="Get episodes for serie from database",
)
def get_episodes(movie_id: str):
    # Validate movie_id
    series_id = [serie["movie"] for serie in db.get_movies(only_movies=False)]
    if movie_id not in series_id:
        raise HTTPException(
            status_code=400, detail="Provided movie_id doesn't match to any series id."
        )
    else:
        episodes = db.get_episodes(serie_name=movie_id)
        for episode in episodes:
            episode["movie_id"] = episode["movie"]
        return {"episodes": episodes}


@app.post(
    "/find_lyrics",
    response_model=FindLyricsModel,
    description="Get lyrics from database",
)
@cache()
async def find_lyrics(req: FindLyricsRequest):
    # Get translations
    client = Client(
        source_lang=req.main_language_id,
        target_lang=req.translation_language_id,
    )
    translations = list(client.get_translations(req.searched_phrase))

    # Get lyrics
    only_movies = None
    movie_id = None
    if req.source is not None:
        only_movies = req.source == "only_movies"

    if req.movie_id is not None:
        movie_id = req.movie_id

    lyrics = db.get_lyrics(
        req.searched_phrase,
        req.main_language_id,
        req.translation_language_id,
        sorting_mode=req.sorting_mode,
        only_movies=only_movies,
        movie=movie_id,
    )

    # Mark translated words
    for result in lyrics["main_results"]:
        for word in translations:
            r = re.compile(f"{word}")
            result[req.translation_language_id] = WordMarker.mark_word(result[req.translation_language_id], r)

    for result in lyrics["similar_results"]:
        for word in translations:
            r = re.compile(f"{word}")
            result[req.translation_language_id] = WordMarker.mark_word(result[req.translation_language_id], r)

    main_results = [
        {
            "id": lyric["id"],
            "main_sentence": lyric[req.main_language_id],
            "translated_sentence": lyric[req.translation_language_id],
            "time": lyric["seconds"],
            "movie": db.get_movie(movie_id=lyric["movie_id_fk"]),
            "episode": db.get_episode(episode_id=lyric["episode_id_fk"])
            if lyric["episode_id_fk"] is not None
            else None,
        }
        for lyric in lyrics["main_results"]
    ][:100]

    # FIXME: Remove redundancy
    if len(req.searched_phrase) == 1:
        similar_results = []
    else:
        similar_results = [
            {
                "id": lyric["id"],
                "main_sentence": lyric[req.main_language_id],
                "translated_sentence": lyric[req.translation_language_id],
                "time": lyric["seconds"],
                "movie": db.get_movie(movie_id=lyric["movie_id_fk"]),
                "episode": db.get_episode(episode_id=lyric["episode_id_fk"])
                if lyric["episode_id_fk"] is not None
                else None,
            }
            for lyric in lyrics["similar_results"]
        ][:100]


    return {
        "main_language_id": req.main_language_id,
        "translation_language_id": req.translation_language_id,
        "translations": translations,
        "main_results": main_results,
        "similar_results": similar_results,
    }

@app.on_event("startup")
async def startup():
    # TODO: Add redis ip to settings
    redis = aioredis.from_url("redis://localhost", encoding="utf8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="lyricatedapi-cache")