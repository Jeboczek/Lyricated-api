from typing import List

from pydantic import BaseModel


class EpisodeModel(BaseModel):
    season: int
    episode: int


class ListEpisodeModel(BaseModel):
    episodes: List[EpisodeModel]
