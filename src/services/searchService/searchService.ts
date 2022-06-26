import SearchServiceSearch from "./libs/searchServiceSearch";
import SearchServiceHighlight from "./libs/searchServiceHighlight";
import SearchRequest from "../../models/request/searchRequest";
import LyricModel from "../../models/database/api/lyricModel";
import LyricSentenceModel from "../../models/database/api/translations/lyricSentenceModel";
import { Op } from "sequelize";
import SearchServiceFilter from "./libs/searchServiceFilter";

export default class SearchService {
    constructor(
        private searcher: SearchServiceSearch = new SearchServiceSearch(),
        private filterer: SearchServiceFilter = new SearchServiceFilter(),
        private highlighter: SearchServiceHighlight = new SearchServiceHighlight(),
        private sorter: SearchServiceHighlight = new SearchServiceHighlight()
    ) {}

    async search(options: SearchRequest) {
        const {
            from_lang_id: fromLang,
            search_phase: searchPhase,
            to_lang_id: toLang,
            filter_options: filterOptions,
        } = options;

        // Get LyricModels with queried languages
        let lyrics = await LyricModel.findAll({
            include: {
                model: LyricSentenceModel,
                where: {
                    langId: {
                        [Op.in]: [fromLang, toLang],
                    },
                },
            },
            where: {},
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

        console.log(mainResults);
        console.log(similarResults);
    }
}
