import SearchServiceSearch from "./libs/searchServiceSearch";
import SearchServiceHighlight from "./libs/searchServiceHighlight";
import SearchRequest from "../../models/request/searchRequest";
import LyricModel from "../../models/database/api/lyricModel";
import LyricSentenceModel from "../../models/database/api/translations/lyricSentenceModel";
import { Op } from "sequelize";
import SearchServiceFilter from "./libs/searchServiceFilter";
import MainMatcher from "./matchers/mainMatcher";
import SimilarMatcher from "./matchers/similarMatcher";
import MovieModel from "../../models/database/api/movieModel";
import EpisodeModel from "../../models/database/api/episodeModel";
import MovieNameModel from "../../models/database/api/translations/movieNameModel";
import SearchServiceReturn from "./interfaces/searchServiceReturn";
import SearchServiceResult from "./interfaces/searchServiceResult";

export default class SearchService {
    constructor(
        private searcher: SearchServiceSearch = new SearchServiceSearch(),
        private filterer: SearchServiceFilter = new SearchServiceFilter(),
        private highlighter: SearchServiceHighlight = new SearchServiceHighlight(),
        private sorter: SearchServiceHighlight = new SearchServiceHighlight()
    ) {}

    async search(options: SearchRequest): Promise<SearchServiceReturn> {
        const {
            from_lang_id: fromLang,
            search_phase: searchPhase,
            to_lang_id: toLang,
            filter_options: filterOptions,
        } = options;

        // Get LyricModels with queried languages
        // This helping query is designed to select only those lyrics where the word is searched for
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

        let lyrics = await LyricModel.findAll({
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

        lyrics = this.filterer.filter(lyrics, filterOptions);

        const { mainResults, similarResults } = await this.searcher.search(
            lyrics,
            {
                fromLang,
                searchPhase,
                toLang,
            }
        );

        const mainGlobalRegrex = MainMatcher.get(searchPhase, "g");
        const similarGlobalRegrex = SimilarMatcher.get(searchPhase, "g");
        return {
            mains: mainResults.map((e) => {
                return {
                    lyricModel: e,
                    fromHighlights:
                        this.highlighter.highlightSpecifiedByLangSentence(
                            e,
                            searchPhase,
                            fromLang,
                            mainGlobalRegrex
                        ),
                    toHighlights:
                        this.highlighter.highlightSpecifiedByLangSentence(
                            e,
                            searchPhase,
                            toLang,
                            mainGlobalRegrex
                        ),
                } as SearchServiceResult;
            }),
            similar: similarResults.map((e) => {
                return {
                    lyricModel: e,
                    fromHighlights:
                        this.highlighter.highlightSpecifiedByLangSentence(
                            e,
                            searchPhase,
                            fromLang,
                            similarGlobalRegrex
                        ),
                    toHighlights:
                        this.highlighter.highlightSpecifiedByLangSentence(
                            e,
                            searchPhase,
                            toLang,
                            similarGlobalRegrex
                        ),
                } as SearchServiceResult;
            }),
        };
    }
}
