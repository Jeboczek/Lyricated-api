from typing import List

from pydantic import BaseModel

from models.enums.language_id import LanguageID
from models.response.lyric_model import LyricModel


class FindLyricsModel(BaseModel):
     main_language_id : LanguageID
     translation_language_id: LanguageID
     search_word: str
     translations: List[str] = []
     main_results: List[LyricModel] = []
     similar_results: List[LyricModel] = []