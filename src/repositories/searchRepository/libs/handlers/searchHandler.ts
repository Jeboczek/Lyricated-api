import LyricModel from "../../../../models/database/api/lyricModel";
import LyricSentenceModel from "../../../../models/database/api/translations/lyricSentenceModel";
import SearchRepositoryState from "../../interfaces/searchRepositoryState";
import AbstractHandler from "./abstractHandler";
import MainMatcher from "../matchers/mainMatcher";
import SimilarMatcher from "../matchers/similarMatcher";
import { Op } from "sequelize";
import MovieModel from "../../../../models/database/api/movieModel";
import EpisodeModel from "../../../../models/database/api/episodeModel";
import MovieNameModel from "../../../../models/database/api/translations/movieNameModel";
import SearchRepositoryResult from "../../interfaces/searchRepositoryResult";

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

export default class SearchHandler extends AbstractHandler {
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

    private async _getLyricsFromDatabase(
        fromLang: string,
        toLang: string,
        searchPhase: string
    ): Promise<LyricModel[]> {
        const idsWithPhase = (
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
        state: SearchRepositoryState
    ): Promise<SearchRepositoryState> {
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

        for (let i = 0; i <= 1; i++) {
            const data = dataFromAllPromises[i].map((lyric) => {
                return {
                    lyricModel: lyric,
                    fromHighlights: [],
                    toHighlights: [],
                } as SearchRepositoryResult;
            });

            // If data from the first Promise are fetched, write to state.mains
            if (i === 0) state.mains = data;
            state.similar = data;
        }

        return await super.handle(state);
    }
}
