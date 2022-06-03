from typing import Any


class WordMarker:
    MARK_SYMBOL = "¦"

    @staticmethod
    def mark_word(sentence: str, r: Any):
        tmp_sentence = sentence.lower()
        sr = r.search(tmp_sentence)
        if sr is not None:
            start = sr.span()[0]
            end = sr.span()[1]
            splitted_sentence = [x for x in sentence]
            splitted_sentence.insert(end, WordMarker.MARK_SYMBOL)
            splitted_sentence.insert(start, WordMarker.MARK_SYMBOL)
            sentence = "".join(splitted_sentence)
        return sentence
