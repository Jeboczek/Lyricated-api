from typing import Optional
from models.response.episode_model import EpisodeModel
from pydantic import BaseModel
from models.response.movie_model import MovieModel


class GetRandomLyricModel(BaseModel):
    main_sentence: str
    translated_sentence: str
    movie: Optional[MovieModel]
    episode: Optional[EpisodeModel]
