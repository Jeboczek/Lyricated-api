import SearchResultResponse from "../../../models/response/searchResultResponse";
import LyricResponse from "../../../models/response/lyricResponse";
import SearchServiceResult from "../../../services/searchService/interfaces/searchServiceResult";

export default class ChangeSearchResults {
    static change(result: SearchServiceResult[]): SearchResultResponse[] {
        return result.map((e) => {
            const { fromHighlights, toHighlights, lyricModel } = e;

            return {
                lyric: LyricResponse.fromModel(lyricModel),
                from_highlights: fromHighlights,
                to_highlights: toHighlights,
            } as SearchResultResponse;
        });
    }
}
