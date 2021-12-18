from pydantic import BaseModel


class EpisodeModel(BaseModel):
    season: int
    episode: int


class ListEpisodeModel(BaseModel):
    episodes: list[EpisodeModel]
