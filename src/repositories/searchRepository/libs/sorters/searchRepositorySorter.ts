import SearchRepositoryResult from "../../interfaces/searchRepositoryResult";

export default abstract class SearchRepositorySorter {
    protected _addLyricModelSentencesLengths(
        result: SearchRepositoryResult
    ): number {
        let length = 0;
        for (const sentence of result.lyricModel.sentences) {
            length += sentence.content.length;
        }
        return length;
    }

    public abstract sort(
        lyrics: SearchRepositoryResult[]
    ): SearchRepositoryResult[];
}
