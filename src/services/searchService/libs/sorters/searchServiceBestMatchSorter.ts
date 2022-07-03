import SearchServiceSorter from "./searchServiceSorter";
import SearchServiceResult from "../../interfaces/searchServiceResult";

export default class SearchServiceBestMatchSorter extends SearchServiceSorter {
    private _calculateBestMatchValueForResult(
        result: SearchServiceResult
    ): number {
        const firstSentence = result.lyricModel.sentences[0];
        const secondSentence = result.lyricModel.sentences[1];

        return Math.abs(
            firstSentence.content.length -
                secondSentence.content.length -
                Math.round(firstSentence.content.length / 10) * 10 -
                25
        );
    }

    sort(results: SearchServiceResult[]): SearchServiceResult[] {
        return results.sort((a, b) => {
            const aValue = this._calculateBestMatchValueForResult(a);
            const bValue = this._calculateBestMatchValueForResult(b);

            if (bValue < aValue) return -1;
            if (bValue > aValue) return 1;
            return 0;
        });
    }
}
