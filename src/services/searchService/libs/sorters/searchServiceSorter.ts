import SearchServiceResult from "../../interfaces/searchServiceResult";

export default abstract class SearchServiceSorter {
    protected _addLyricModelSentencesLengths(
        result: SearchServiceResult
    ): number {
        let length = 0;
        for (const sentence of result.lyricModel.sentences) {
            length += sentence.content.length;
        }
        return length;
    }

    public abstract sort(lyrics: SearchServiceResult[]): SearchServiceResult[];
}
