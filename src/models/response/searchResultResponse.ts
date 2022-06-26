import LyricSentenceResponse from "./translations/lyricSentenceResponse";
import HighlightResponse from "./highlightResponse";
import LyricResponse from "./lyricResponse";

export default class SearchResultResponse {
    lyric: LyricResponse;
    from_sentence: LyricSentenceResponse;
    to_sentence: LyricSentenceResponse;
    from_highlights: HighlightResponse[];
    to_highlights: HighlightResponse[];
}
