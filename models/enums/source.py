from enum import Enum


class Source(str, Enum):
    only_movies = "only_movies"
    only_series = "only_series"