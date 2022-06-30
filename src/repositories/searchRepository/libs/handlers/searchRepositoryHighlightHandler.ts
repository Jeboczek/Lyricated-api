import HighlightResponse from "../../../../models/response/highlightResponse";
import LyricSentenceModel from "../../../../models/database/api/translations/lyricSentenceModel";
import LyricModel from "../../../../models/database/api/lyricModel";
import SearchRepositoryState from "../../interfaces/searchRepositoryState";
import SearchRepositoryAbstractHandler from "./searchRepositoryAbstractHandler";
import MainMatcher from "../matchers/mainMatcher";
import SimilarMatcher from "../matchers/similarMatcher";

export default class SearchRepositoryHighlightHandler extends SearchRepositoryAbstractHandler {
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
        state: SearchRepositoryState
    ): Promise<SearchRepositoryState> {
        const {
            from_lang_id: fromLang,
            to_lang_id: toLang,
            search_phase: phase,
        } = state.request;

        for (const [i, results] of [state.mains, state.similar].entries()) {
            let r: RegExp;
            // If result is main not similar
            if (i === 0) r = MainMatcher.get(phase, "g");
            else r = SimilarMatcher.get(phase, "g");

            for (const result of results) {
                // Highlight from results
                result.fromHighlights = this.highlightSpecifiedByLangSentence(
                    result.lyricModel,
                    phase,
                    fromLang,
                    r
                );

                for (const word of state.translations) {
                    r = MainMatcher.get(word, "g");
                    const highlights = this.highlightSpecifiedByLangSentence(
                        result.lyricModel,
                        word,
                        toLang,
                        r
                    );
                    result.toHighlights = [
                        ...result.toHighlights,
                        ...highlights,
                    ];
                }
            }
        }
        return await super.handle(state);
    }
}
