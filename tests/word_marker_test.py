import re
import unittest

from word_marker.word_marker import WordMarker

class TestWordMarker(unittest.TestCase):
    def test_word_marker_all_lowercase(self):
        sentence = "I like fruit."
        to_search = "fruit"
        marked_sentence = WordMarker.mark_word(sentence, re.compile(rf"\b{to_search}\b[^']"))

        self.assertEqual(marked_sentence, f"I like {WordMarker.MARK_SYMBOL}fruit.{WordMarker.MARK_SYMBOL}")
    
    def test_word_marker_uppercase(self):
        sentence = "I like FRUIT."
        to_search = "fruit"
        marked_sentence = WordMarker.mark_word(sentence, re.compile(rf"\b{to_search}\b[^']"))

        self.assertEqual(marked_sentence, f"I like {WordMarker.MARK_SYMBOL}FRUIT.{WordMarker.MARK_SYMBOL}")