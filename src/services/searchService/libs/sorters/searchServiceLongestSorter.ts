import SearchServiceSorter from "./searchServiceSorter";
import SearchServiceResult from "../../interfaces/searchServiceResult";

export default class SearchServiceLongestSorter extends SearchServiceSorter {
    sort(results: SearchServiceResult[]): SearchServiceResult[] {
        return results.sort((a, b) => {
            const aLength = this._addLyricModelSentencesLengths(a);
            const bLength = this._addLyricModelSentencesLengths(b);

            if (bLength < aLength) return -1;
            if (bLength > aLength) return 1;
            return 0;
        });
    }
}
