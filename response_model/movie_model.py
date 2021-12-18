from typing import Optional
from pydantic import BaseModel

from response_model.enums.original_lang import OriginalLang


class MovieModel(BaseModel):
    id: str
    original_lang: OriginalLang
    type: str
    minutes: int
    en: Optional[str] = None
    pl: Optional[str] = None
    es: Optional[str] = None
    fr: Optional[str] = None
    dr: Optional[str] = None
    it: Optional[str] = None
    pt: Optional[str] = None


class ListMovieModel(BaseModel):
    movies: list[MovieModel]
