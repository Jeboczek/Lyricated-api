from pydantic import BaseModel

class SetLyricQualityRequest(BaseModel):
    lyric_id: int
    quality: int

    def __str__(self) -> str:
        return (
            f"{self.lyric_id}{self.quality}"
        )