import SearchServiceSorter from "./searchServiceSorter";
import SearchServiceResult from "../../interfaces/searchServiceResult";

export default class SearchServiceShortestSorter extends SearchServiceSorter {
    sort(results: SearchServiceResult[]): SearchServiceResult[] {
        return results.sort((a, b) => {
            const aLength = this._addLyricModelSentencesLengths(a);
            const bLength = this._addLyricModelSentencesLengths(b);

            if (aLength < bLength) return -1;
            if (aLength > bLength) return 1;
            return 0;
        });
    }
}
