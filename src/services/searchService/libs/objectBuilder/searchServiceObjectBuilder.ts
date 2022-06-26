import SearchServiceReturn from "../../interfaces/searchServiceReturn";
import SearchServiceResult from "../../interfaces/searchServiceResult";
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

export interface SearchServiceResultBuilderOptions {
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

export default class SearchServiceObjectsBuilder {
    static buildResult(
        options: SearchServiceResultBuilderOptions
    ): SearchServiceResult {
        const { lyric, highlightFunction, r, fromLang, toLang } = options;

        return {
            lyricModel: lyric,
            fromHighlights: highlightFunction(lyric, r, fromLang),
            toHighlights: highlightFunction(lyric, r, toLang),
        } as SearchServiceResult;
    }

    static buildReturn(
        options: SearchServiceReturnBuilderOptions
    ): SearchServiceReturn {
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
                SearchServiceObjectsBuilder.buildResult({
                    lyric,
                    r: mainGlobalRegExp,
                    highlightFunction,
                    fromLang,
                    toLang,
                })
            ),
            similar: similarResults.map((lyric) =>
                SearchServiceObjectsBuilder.buildResult({
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
