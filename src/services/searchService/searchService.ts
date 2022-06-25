import SearchServiceSearch from "./libs/searchServiceSearch";
import SearchServiceHighlight from "./libs/searchServiceHighlight";
import SearchRequest from "../../models/request/searchRequest";

export default class SearchService {
    constructor(
        private searcher: SearchServiceSearch = new SearchServiceSearch(),
        private filter: SearchServiceSearch = new SearchServiceSearch(),
        private highlighter: SearchServiceHighlight = new SearchServiceHighlight(),
        private sorter: SearchServiceHighlight = new SearchServiceHighlight()
    ) {}

    async search(options: SearchRequest) {
        const {
            from_lang_id: fromLang,
            search_phase: searchPhase,
            to_lang_id: toLang,
        } = options;

        const { mainResults, similarResults } = await this.searcher.search({
            fromLang,
            searchPhase,
            toLang,
        });

        console.log(mainResults);
        console.log(similarResults);
    }
}
