from pydantic import BaseModel
from models.enums.language_id import LanguageID
from models.response.movie_model import MovieModel


class FindRandomLyricModel(BaseModel):
    main_sentence: str
    translated_sentence: str
