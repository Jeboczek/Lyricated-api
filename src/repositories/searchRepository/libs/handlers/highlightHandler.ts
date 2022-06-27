import HighlightResponse from "../../../../models/response/highlightResponse";
import LyricSentenceModel from "../../../../models/database/api/translations/lyricSentenceModel";
import LyricModel from "../../../../models/database/api/lyricModel";
import SearchRepositoryState from "../../interfaces/searchRepositoryState";
import AbstractHandler from "./abstractHandler";
import MainMatcher from "../matchers/mainMatcher";

export default class HighlightHandler extends AbstractHandler {
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
        const matches = [...lyricSentence.content.matchAll(r)];
        return matches.map((e) => {
            if (e.index !== undefined)
                return { from: e.index, to: e.index + searchPhase.length - 1 };
        }) as HighlightResponse[];
    }

    public async handle(
        state: SearchRepositoryState
    ): Promise<SearchRepositoryState> {
        const { from_lang_id: fromLang, search_phase: phase } = state.request;

        for (const results of [state.mains, state.similar]) {
            for (const result of results) {
                const mainGlobalRegExp = MainMatcher.get(phase, "g");
                result.fromHighlights = this.highlightSpecifiedByLangSentence(
                    result.lyricModel,
                    phase,
                    fromLang,
                    mainGlobalRegExp
                );
                // TODO: Matcher for similar result's
            }
        }
        return await super.handle(state);
    }
}
