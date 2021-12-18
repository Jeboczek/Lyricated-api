from pydantic import BaseModel
from models.enums.language_id import LanguageID
from models.response.lyric_model import LyricModel


class FindLyricsModel(BaseModel):
     main_language_id : LanguageID
     translation_language_id: LanguageID
     translations: list[str] = []
     main_results: list[LyricModel] = []
     similiar_results: list[LyricModel] = []