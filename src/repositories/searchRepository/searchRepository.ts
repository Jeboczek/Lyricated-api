import SearchRepositorySearch from "./libs/searchRepositorySearch";
import SearchRepositoryHighlight from "./libs/searchRepositoryHighlight";
import SearchRequest from "../../models/request/searchRequest";
import LyricModel from "../../models/database/api/lyricModel";
import LyricSentenceModel from "../../models/database/api/translations/lyricSentenceModel";
import { Op } from "sequelize";
import SearchRepositoryFilter from "./libs/searchRepositoryFilter";
import MainMatcher from "./libs/matchers/mainMatcher";
import SimilarMatcher from "./libs/matchers/similarMatcher";
import MovieModel from "../../models/database/api/movieModel";
import EpisodeModel from "../../models/database/api/episodeModel";
import MovieNameModel from "../../models/database/api/translations/movieNameModel";
import SearchRepositoryReturn from "./interfaces/searchRepositoryReturn";
import SearchRepositoryObjectsBuilder from "./libs/objectBuilder/searchRepositoryObjectBuilder";

export default class SearchRepository {
    constructor(
        private searcher: SearchRepositorySearch = new SearchRepositorySearch(),
        private filterer: SearchRepositoryFilter = new SearchRepositoryFilter(),
        private highlighter: SearchRepositoryHighlight = new SearchRepositoryHighlight(),
        private sorter: SearchRepositoryHighlight = new SearchRepositoryHighlight()
    ) {}

    async search(options: SearchRequest): Promise<SearchRepositoryReturn> {
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

        const mainGlobalRegExp = MainMatcher.get(searchPhase, "g");
        const similarGlobalRegExp = SimilarMatcher.get(searchPhase, "g");
        return SearchRepositoryObjectsBuilder.buildReturn({
            highlightFunction: (lyric: LyricModel, r: RegExp, lang: string) => {
                return this.highlighter.highlightSpecifiedByLangSentence(
                    lyric,
                    searchPhase,
                    lang,
                    r
                );
            },
            mainGlobalRegExp,
            mainResults,
            similarGlobalRegExp,
            similarResults,
            fromLang,
            toLang,
        });
    }
}
