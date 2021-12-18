import re
from typing import Optional
import fastapi
from fastapi.exceptions import HTTPException
from models.request.find_lyrics_request import FindLyricsRequest
import repository
from models.enums.source import Source
from models.response.episode_model import ListEpisodeModel
from models.response.movie_model import ListMovieModel
from models.response.find_lyrics_model import FindLyricsModel
import settings
from reverso_context_api import Client

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
async def get_movies(source: Optional[Source] = None):
    if source is None:
        only_movies = None
    else:
        only_movies = True if source == "only_movies" else False

    movies = db.get_movies(only_movies=only_movies)
    for movie in movies:
        movie["id"] = movie["movie"]

    return {"movies": movies}


@app.get(
    "/get_episodes",
    response_model=ListEpisodeModel,
    description="Get episodes for serie from database",
)
async def get_episodes(movie_id: str):
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
async def find_lyrics(request: FindLyricsRequest):
    # Get translations
    client = Client(
        source_lang=request.main_language_id,
        target_lang=request.translation_language_id,
    )
    translations = list(client.get_translations(request.searched_phrase))

    # Get lyrics
    only_movies = None
    movie_id = None
    if request.source is not None and len(request.source) == 2:
        only_movies = request.source

    if request.movie_id is not None:
        movie_id = request.movie_id

    lyrics = db.get_lyrics(
        request.searched_phrase,
        request.main_language_id,
        request.translation_language_id,
        sorting_mode=request.sorting_mode,
        only_movies=only_movies,
        movie=movie_id,
    )

    # Mark translated words
    for result in lyrics["main_results"]:
        for word in translations:
            result[request.translation_language_id] = result[request.translation_language_id].replace(word, f"$%{word}$%")

    for result in lyrics["similiar_results"]:
        for word in translations:
            result[request.translation_language_id] = result[request.translation_language_id].replace(word, f"$%{word}$%")

    main_results = [
        {
            "id": lyric["id"],
            "main_sentence": lyric[request.main_language_id],
            "translated_sentence": lyric[request.translation_language_id],
            "time": lyric["seconds"],
            "movie": db.get_movie(movie_id=lyric["movie_id_fk"]),
            "episode": db.get_episode(episode_id=lyric["episode_id_fk"])
            if lyric["episode_id_fk"] is not None
            else None,
        }
        for lyric in lyrics["main_results"]
    ]

    # FIXME: Remove redundancy
    similiar_results = [
        {
            "id": lyric["id"],
            "main_sentence": lyric[request.main_language_id],
            "translated_sentence": lyric[request.translation_language_id],
            "time": lyric["seconds"],
            "movie": db.get_movie(movie_id=lyric["movie_id_fk"]),
            "episode": db.get_episode(episode_id=lyric["episode_id_fk"])
            if lyric["episode_id_fk"] is not None
            else None,
        }
        for lyric in lyrics["similiar_results"]
    ]


    return {
        "main_language_id": request.main_language_id,
        "translation_language_id": request.translation_language_id,
        "translations": translations,
        "main_results": main_results,
        "similiar_results": similiar_results,
    }
