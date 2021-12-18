from enum import Enum

class SortingMode(str, Enum):
    BEST_MATCH = "best_match"
    SHORTESTS = "shortests"
    LONGEST = "longest"