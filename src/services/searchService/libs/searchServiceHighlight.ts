import HighlightResponse from "../../../models/response/highlightResponse";
import LyricSentenceModel from "../../../models/database/api/translations/lyricSentenceModel";
import LyricModel from "../../../models/database/api/lyricModel";

export default class SearchServiceHighlight {
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
}
