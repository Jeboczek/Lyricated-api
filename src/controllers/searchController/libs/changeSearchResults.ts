import { SearchServiceResult } from "../../../services/searchService/searchService";
import SearchResultResponse from "../../../models/response/searchResultResponse";
import LyricResponse from "../../../models/response/lyricResponse";

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
