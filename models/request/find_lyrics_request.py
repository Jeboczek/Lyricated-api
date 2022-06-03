from typing import Optional

from pydantic import BaseModel

from models.enums.language_id import LanguageID
from models.enums.sorting_mode import SortingMode
from models.enums.source import Source


class FindLyricsRequest(BaseModel):
    searched_phrase: str
    main_language_id: LanguageID
    translation_language_id: LanguageID
    sorting_mode: SortingMode = SortingMode.BEST_MATCH
    curses: bool
    source: Optional[Source] = None
    movie_id: Optional[str] = None

    def __str__(self) -> str:
        return f"{self.searched_phrase}{self.main_language_id}{self.translation_language_id}"
