from pydantic import BaseModel
from enums.language_id import LanguageID
from models.response.lyric_item import LyricModel


class FindLyricsModel(BaseModel):
     main_language_id : LanguageID
     translation_language_id: LanguageID
     translations: list[str]
     main_resulsts: list[LyricModel]
     similiar_results: list[LyricModel]