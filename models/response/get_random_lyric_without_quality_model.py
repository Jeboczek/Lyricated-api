from typing import Optional
from models.response.episode_model import EpisodeModel
from pydantic import BaseModel
from models.response.movie_model import MovieModel


class GetRandomLyricWithoutQualityModel(BaseModel):
    id: int
    en: str
    pl: str
    de: str
    es: str
    fr: str
    pt: str
    it: str