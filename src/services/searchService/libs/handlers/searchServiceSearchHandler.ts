import LyricModel from "../../../../models/database/api/lyricModel";
import LyricSentenceModel from "../../../../models/database/api/translations/lyricSentenceModel";
import SearchServiceState from "../../interfaces/searchServiceState";
import SearchServiceAbstractHandler from "./searchServiceAbstractHandler";
import SearchServiceMainMatcher from "../matchers/searchServiceMainMatcher";
import SearchServiceSimilarMatcher from "../matchers/searchServiceSimilarMatcher";
import { Op } from "sequelize";
import MovieModel from "../../../../models/database/api/movieModel";
import EpisodeModel from "../../../../models/database/api/episodeModel";
import MovieNameModel from "../../../../models/database/api/translations/movieNameModel";
import SearchServiceResult from "../../interfaces/searchServiceResult";

interface SearchServiceResultGetterOptions {
    fromLang: string;
    lyrics: LyricModel[];
}

export default class SearchServiceSearchHandler extends SearchServiceAbstractHandler {
    handlerName = "search";

    private async _getResults(
        options: SearchServiceResultGetterOptions,
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

    private async _getLyricsFromDatabase(
        fromLang: string,
        toLang: string,
        searchPhase: string
    ): Promise<LyricModel[]> {
        let idsWithPhase = (
            await LyricModel.findAll({
                include: [
                    {
                        model: LyricSentenceModel,
                        where: {
                            langId: {
                                [Op.eq]: fromLang,
                            },
                            content: {
                                [Op.like]: `%${searchPhase.slice(0, -1)}%`,
                            },
                        },
                    },
                ],
            })
        ).map((e) => {
            return e.id;
        });

        if (idsWithPhase.length > 1000) {
            idsWithPhase = idsWithPhase.slice(0, 1000);
        }

        return await LyricModel.findAll({
            where: {
                id: {
                    [Op.in]: idsWithPhase,
                },
            },
            include: [
                { model: MovieModel, include: [EpisodeModel, MovieNameModel] },
                {
                    model: LyricSentenceModel,
                    where: {
                        langId: {
                            [Op.in]: [fromLang, toLang],
                        },
                    },
                },
            ],
        });
    }

    public async handle(
        state: SearchServiceState
    ): Promise<SearchServiceState> {
        this._beforeHandle();
        const {
            from_lang_id: fromLang,
            search_phase: searchPhase,
            to_lang_id: toLang,
        } = state.request;

        // Get lyrics from database
        let lyrics = await this._getLyricsFromDatabase(
            fromLang,
            toLang,
            searchPhase
        );

        //  Filter LyricModel's without 2 LyricSentence's
        lyrics = lyrics.filter((e) => e.sentences.length === 2);

        // Split to main and similar results
        const mainRegExp = SearchServiceMainMatcher.get(searchPhase);
        const similarRegExp = SearchServiceSimilarMatcher.get(searchPhase);

        const resultGetterOptions: SearchServiceResultGetterOptions = {
            fromLang,
            lyrics,
        };
        const dataFromAllPromises = await Promise.all([
            this._getResults(resultGetterOptions, mainRegExp),
            this._getResults(resultGetterOptions, similarRegExp),
        ]);

        for (let i = 0; i <= 1; i++) {
            const data = dataFromAllPromises[i].map((lyric) => {
                return {
                    lyricModel: lyric,
                    fromHighlights: [],
                    toHighlights: [],
                } as SearchServiceResult;
            });

            // If data from the first Promise are fetched, write to state.mains
            if (i === 0) state.mains = data;
            state.similar = data;
        }

        this._afterHandle(state);
        return await super.handle(state);
    }
}
