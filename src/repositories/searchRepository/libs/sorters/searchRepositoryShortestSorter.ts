import SearchRepositorySorter from "./searchRepositorySorter";
import SearchRepositoryResult from "../../interfaces/searchRepositoryResult";

export default class SearchRepositoryShortestSorter extends SearchRepositorySorter {
    sort(results: SearchRepositoryResult[]): SearchRepositoryResult[] {
        return results.sort((a, b) => {
            const aLength = this._addLyricModelSentencesLengths(a);
            const bLength = this._addLyricModelSentencesLengths(b);

            if (aLength < bLength) return -1;
            if (aLength > bLength) return 1;
            return 0;
        });
    }
}
