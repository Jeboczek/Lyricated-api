from typing import Optional

from pydantic import BaseModel

from models.response.episode_model import EpisodeModel
from models.response.movie_model import MovieModel


class GetRandomLyricModel(BaseModel):
    id: int
    time: int
    main_sentence: str
    translated_sentence: str
    movie: Optional[MovieModel]
    episode: Optional[EpisodeModel]
