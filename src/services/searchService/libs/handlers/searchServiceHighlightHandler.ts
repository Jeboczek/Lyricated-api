import HighlightResponse from "../../../../models/response/highlightResponse";
import LyricSentenceModel from "../../../../models/database/api/translations/lyricSentenceModel";
import LyricModel from "../../../../models/database/api/lyricModel";
import SearchServiceState from "../../interfaces/searchServiceState";
import SearchServiceAbstractHandler from "./searchServiceAbstractHandler";
import SearchServiceMainMatcher from "../matchers/searchServiceMainMatcher";
import SearchServiceSimilarMatcher from "../matchers/searchServiceSimilarMatcher";

export default class SearchServiceHighlightHandler extends SearchServiceAbstractHandler {
    handlerName = "highlight";

    highlightSpecifiedByLangSentence(
        lyric: LyricModel,
        searchPhase: string,
        lang: string,
        r: RegExp
    ): HighlightResponse[] {
        const lyricSentence = lyric.sentences.find((e) => e.langId === lang);

        if (lyricSentence !== undefined)
            return this.highlight(lyricSentence, searchPhase, r);
        return [];
    }

    highlight(
        lyricSentence: LyricSentenceModel,
        searchPhase: string,
        r: RegExp
    ): HighlightResponse[] {
        const matches = [...lyricSentence.content.toLowerCase().matchAll(r)];
        return matches.map((e) => {
            if (e.index !== undefined)
                return { from: e.index, to: e.index + e[0].length - 1 };
        }) as HighlightResponse[];
    }

    public async handle(
        state: SearchServiceState
    ): Promise<SearchServiceState> {
        this._beforeHandle();
        const {
            from_lang_id: fromLang,
            to_lang_id: toLang,
            search_phase: phase,
        } = state.request;

        for (const [i, results] of [state.mains, state.similar].entries()) {
            let r: RegExp;
            // If result is main not similar
            if (i === 0) r = SearchServiceMainMatcher.get(phase, "g");
            else r = SearchServiceSimilarMatcher.get(phase, "g");

            for (const result of results) {
                // Highlight from results
                result.fromHighlights = this.highlightSpecifiedByLangSentence(
                    result.lyricModel,
                    phase,
                    fromLang,
                    r
                );

                for (const word of state.translations) {
                    const tR = SearchServiceMainMatcher.get(word, "g");
                    const highlights = this.highlightSpecifiedByLangSentence(
                        result.lyricModel,
                        word,
                        toLang,
                        tR
                    );
                    result.toHighlights = [
                        ...result.toHighlights,
                        ...highlights,
                    ];
                }
                console.log(result.fromHighlights);
            }
        }

        this._afterHandle(state);
        return await super.handle(state);
    }
}
