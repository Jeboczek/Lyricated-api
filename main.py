import random
import re
from typing import Optional
import aioredis
import fastapi
from fastapi.exceptions import HTTPException
from models.request.find_lyrics_request import FindLyricsRequest
from models.request.find_random_lryic_requrest import GetRandomLyricRequest
import repository
from models.enums.source import Source
from models.response.episode_model import ListEpisodeModel
from models.response.get_random_lyric_model import GetRandomLyricModel
from models.response.get_random_lyric_without_quality_model import GetRandomLyricWithoutQualityModel
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
    description="Get single movie from database",
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
    for result_name in ["main_results", "similar_results"]:
        for result in lyrics[result_name]:
            for word in translations:
                r = re.compile(f"{word}")
                marked_result = WordMarker.mark_word(
                    result[req.translation_language_id], r
                )
                if marked_result != result[req.translation_language_id]:
                    result[req.translation_language_id] = marked_result
                    break

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
    ]

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
        ]

    return {
        "main_language_id": req.main_language_id,
        "translation_language_id": req.translation_language_id,
        "search_word": req.searched_phrase,
        "translations": translations,
        "main_results": main_results,
        "similar_results": similar_results,
    }


@app.post("/get_random_lyric", response_model=GetRandomLyricModel)
async def get_random_lyric(req: GetRandomLyricRequest):
    lyrics = db.get_random_lyric(
        req.main_language_id, req.translation_language_id, req.lyric_length
    )
    if len(lyrics) > 0:
        rand = random.Random()
        random_lyric = rand.choice(lyrics)
        return {
            "id": random_lyric["id"],
            "time": random_lyric["seconds"],
            "main_sentence": random_lyric[req.main_language_id],
            "translated_sentence": random_lyric[req.translation_language_id],
            "movie": db.get_movie(movie_id=random_lyric["movie_id_fk"]),
            "episode": db.get_episode(episode_id=random_lyric["episode_id_fk"]),
        }
    else:
        return {
            "id": 0,
            "main_Sentence": "",
            "translated_sentence": "",
        }

@app.get("/get_random_lyric", response_model=GetRandomLyricWithoutQualityModel, description="Get random lyric without quality")
async def get_random_lyric():
    lyrics = db.get_random_lyric_without_quality()
    if len(lyrics) > 0:
        rand = random.Random()
        random_lyric = rand.choice(lyrics)
        return {
            "id": random_lyric["id"],
            "en": random_lyric["en"],
            "pl": random_lyric["pl"],
            "de": random_lyric["de"],
            "es": random_lyric["es"],
            "fr": random_lyric["fr"],
            "pt": random_lyric["pt"],
            "it": random_lyric["it"]
        }
    else:
        return {
            "id": 0,
            "en": "",
            "pl": "",
            "de": "",
            "es": "",
            "fr": "",
            "pt": "",
            "it": ""
        }

@app.on_event("startup")
async def startup():
    redis = aioredis.from_url(
        f"redis://{sett.get_redis_ip()}", encoding="utf8", decode_responses=True
    )
    FastAPICache.init(RedisBackend(redis), prefix="lyricatedapi-cache")
