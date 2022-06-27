import SearchRepositoryReturn from "../../interfaces/searchRepositoryReturn";
import SearchRepositoryResult from "../../interfaces/searchRepositoryResult";
import LyricModel from "../../../../models/database/api/lyricModel";
import HighlightResponse from "../../../../models/response/highlightResponse";

export interface SearchServiceReturnBuilderOptions {
    mainResults: LyricModel[];
    similarResults: LyricModel[];
    mainGlobalRegExp: RegExp;
    similarGlobalRegExp: RegExp;
    highlightFunction: (
        lyric: LyricModel,
        r: RegExp,
        lang: string
    ) => HighlightResponse[];
    fromLang: string;
    toLang: string;
}

export interface SearchRepositoryResultBuilderOptions {
    lyric: LyricModel;
    r: RegExp;
    highlightFunction: (
        lyric: LyricModel,
        r: RegExp,
        lang: string
    ) => HighlightResponse[];
    fromLang: string;
    toLang: string;
}

export default class SearchRepositoryObjectsBuilder {
    static buildResult(
        options: SearchRepositoryResultBuilderOptions
    ): SearchRepositoryResult {
        const { lyric, highlightFunction, r, fromLang, toLang } = options;

        return {
            lyricModel: lyric,
            fromHighlights: highlightFunction(lyric, r, fromLang),
            toHighlights: highlightFunction(lyric, r, toLang),
        } as SearchRepositoryResult;
    }

    static buildReturn(
        options: SearchServiceReturnBuilderOptions
    ): SearchRepositoryReturn {
        const {
            mainGlobalRegExp,
            mainResults,
            similarGlobalRegExp,
            similarResults,
            highlightFunction,
            fromLang,
            toLang,
        } = options;
        return {
            mains: mainResults.map((lyric) =>
                SearchRepositoryObjectsBuilder.buildResult({
                    lyric,
                    r: mainGlobalRegExp,
                    highlightFunction,
                    fromLang,
                    toLang,
                })
            ),
            similar: similarResults.map((lyric) =>
                SearchRepositoryObjectsBuilder.buildResult({
                    lyric,
                    r: similarGlobalRegExp,
                    highlightFunction,
                    fromLang,
                    toLang,
                })
            ),
        };
    }
}
