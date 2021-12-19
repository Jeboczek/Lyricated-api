from pydantic import BaseModel
from typing import List


class EpisodeModel(BaseModel):
    season: int
    episode: int


class ListEpisodeModel(BaseModel):
    episodes: List[EpisodeModel]
