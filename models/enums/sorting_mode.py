from enum import Enum


class SortingMode(str, Enum):
    BEST_MATCH = "best_match"
    SHORTEST = "shortest"
    LONGESTS = "longest"
