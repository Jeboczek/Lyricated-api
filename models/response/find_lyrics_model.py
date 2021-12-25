from pydantic import BaseModel
from typing import List
from models.enums.language_id import LanguageID
from models.response.lyric_model import LyricModel


class FindLyricsModel(BaseModel):
     main_language_id : LanguageID
     translation_language_id: LanguageID
     translations: List[str] = []
     main_results: List[LyricModel] = []
     similar_results: List[LyricModel] = []