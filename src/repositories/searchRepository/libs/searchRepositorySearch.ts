import LyricModel from "../../../models/database/api/lyricModel";
import LyricSentenceModel from "../../../models/database/api/translations/lyricSentenceModel";
import MainMatcher from "./matchers/mainMatcher";
import SimilarMatcher from "./matchers/similarMatcher";

export interface SearchRepositoryOptions {
    searchPhase: string;
    fromLang: string;
    toLang: string;
}

export interface SearchRepositorySearchResults {
    mainResults: LyricModel[];
    similarResults: LyricModel[];
}

interface SearchRepositoryResultGetterOptions {
    fromLang: string;
    lyrics: LyricModel[];
}

export default class SearchRepositorySearch {
    private async _getResults(
        options: SearchRepositoryResultGetterOptions,
        regExp: RegExp
    ): Promise<LyricModel[]> {
        const { lyrics, fromLang } = options;
        const promises: Promise<LyricModel | undefined>[] = [];

        for (const lyric of lyrics) {
            promises.push(
                (async () => {
                    const fromLangSentence = lyric.sentences.find(
                        (lyric) => lyric.langId === fromLang
                    );
                    if (fromLangSentence instanceof LyricSentenceModel)
                        if (regExp.test(fromLangSentence.content)) return lyric;
                })()
            );
        }

        return (await Promise.all(promises)).filter(
            (e): e is LyricModel => e !== undefined
        ) as LyricModel[];
    }

    async search(
        lyrics: LyricModel[],
        options: SearchRepositoryOptions
    ): Promise<SearchRepositorySearchResults> {
        const { fromLang, searchPhase } = options;

        //  Filter LyricModel's without 2 LyricSentence's
        lyrics = lyrics.filter((e) => e.sentences.length === 2);

        // Get main and similar results
        const mainRegExp = MainMatcher.get(searchPhase);
        const similarRegExp = SimilarMatcher.get(searchPhase);

        const resultGetterOptions: SearchRepositoryResultGetterOptions = {
            fromLang,
            lyrics,
        };
        const dataFromAllPromises = await Promise.all([
            this._getResults(resultGetterOptions, mainRegExp),
            this._getResults(resultGetterOptions, similarRegExp),
        ]);

        return {
            mainResults: dataFromAllPromises[0],
            similarResults: dataFromAllPromises[1],
        };
    }
}
