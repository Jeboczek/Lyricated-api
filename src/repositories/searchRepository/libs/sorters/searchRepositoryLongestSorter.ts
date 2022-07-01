import SearchRepositorySorter from "./searchRepositorySorter";
import SearchRepositoryResult from "../../interfaces/searchRepositoryResult";

export default class SearchRepositoryLongestSorter extends SearchRepositorySorter {
    sort(results: SearchRepositoryResult[]): SearchRepositoryResult[] {
        return results.sort((a, b) => {
            const aLength = this._addLyricModelSentencesLengths(a);
            const bLength = this._addLyricModelSentencesLengths(b);

            if (bLength < aLength) return -1;
            if (bLength > aLength) return 1;
            return 0;
        });
    }
}
