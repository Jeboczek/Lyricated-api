from pydantic import BaseModel


class LyricQualityModel(BaseModel):
    id: int
    quality: int
    success: bool
