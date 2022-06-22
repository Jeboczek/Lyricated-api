import LyricSentenceResponse from "./translations/lyricSentenceResponse";
import MovieResponse from "./movieResponse";

export default class SearchResultResponse {
    lyric_id: number;
    minute: number;
    from_sentence: LyricSentenceResponse;
    to_sentence: LyricSentenceResponse;
    movie: MovieResponse;
}
