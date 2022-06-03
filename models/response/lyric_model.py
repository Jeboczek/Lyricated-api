from typing import Optional

from pydantic import BaseModel

from models.response.episode_model import EpisodeModel
from models.response.movie_model import MovieModel


class LyricModel(BaseModel):
    id: int
    main_sentence: str
    translated_sentence: str
    time: str
    movie: MovieModel
    episode: Optional[EpisodeModel]
