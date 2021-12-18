from pydantic import BaseModel


class EpisodeModel(BaseModel):
    movie_id: str
    season: int
    episode: int


class ListEpisodeModel(BaseModel):
    episodes: list[EpisodeModel]
