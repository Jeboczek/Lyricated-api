from pydantic import BaseModel


class GetRandomLyricWithoutQualityModel(BaseModel):
    id: int
    en: str
    pl: str
    de: str
    es: str
    fr: str
    pt: str
    it: str