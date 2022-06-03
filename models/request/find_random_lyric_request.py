from typing import Optional

from pydantic import BaseModel

from models.enums.language_id import LanguageID


class GetRandomLyricRequest(BaseModel):
    lyric_length: Optional[int] = 25
    main_language_id: LanguageID
    translation_language_id: LanguageID

    def __str__(self) -> str:
        return (
            f"{self.main_language_id}{self.translation_language_id}{self.lyric_length}"
        )
