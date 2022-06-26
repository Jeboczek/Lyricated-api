import LyricSentenceResponse from "./translations/lyricSentenceResponse";
import MovieResponse from "./movieResponse";
import HighlightResponse from "./highlightResponse";

export default class SearchResultResponse {
    lyric_id: number;
    seconds: number;
    from_sentence: LyricSentenceResponse;
    to_sentence: LyricSentenceResponse;
    from_highlights: HighlightResponse[];
    to_highlights: HighlightResponse[];
    movie: MovieResponse;
}
