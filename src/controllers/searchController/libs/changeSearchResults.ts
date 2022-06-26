import { SearchServiceResult } from "../../../services/searchService/searchService";
import SearchResultResponse from "../../../models/response/searchResultResponse";
import LyricSentenceResponse from "../../../models/response/translations/lyricSentenceResponse";
import LyricSentenceModel from "../../../models/database/api/translations/lyricSentenceModel";
import MovieResponse from "../../../models/response/movieResponse";

export default class ChangeSearchResults {
    static change(
        result: SearchServiceResult[],
        fromLang: string,
        toLang: string
    ): SearchResultResponse[] {
        return result.map((e) => {
            const { id, seconds, movie } = e.lyricModel;
            const { fromHighlights, toHighlights } = e;

            return {
                lyric_id: id,
                seconds: seconds,
                from_sentence: LyricSentenceResponse.fromModel(
                    e.lyricModel.sentences.find(
                        (e) => e.langId === fromLang
                    ) as LyricSentenceModel
                ),
                to_sentence: LyricSentenceResponse.fromModel(
                    e.lyricModel.sentences.find(
                        (e) => e.langId === toLang
                    ) as LyricSentenceModel
                ),
                from_highlights: fromHighlights,
                to_highlights: toHighlights,
                movie: MovieResponse.fromModel(movie),
            } as SearchResultResponse;
        });
    }
}
