from typing import List, Optional

from pydantic import BaseModel

from models.enums.original_lang import OriginalLang


class MovieModel(BaseModel):
    id: str
    lang: OriginalLang
    type: str
    url: str
    minutes: int
    en: Optional[str] = None
    pl: Optional[str] = None
    es: Optional[str] = None
    fr: Optional[str] = None
    dr: Optional[str] = None
    it: Optional[str] = None
    pt: Optional[str] = None


class ListMovieModel(BaseModel):
    movies: List[MovieModel]
