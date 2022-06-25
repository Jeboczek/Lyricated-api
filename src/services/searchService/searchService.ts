import SearchServiceSearch from "./libs/searchServiceSearch";
import SearchServiceHighlight from "./libs/searchServiceHighlight";
import SearchRequest from "../../models/request/searchRequest";

export default class SearchService {
    constructor(
        private filter: SearchServiceSearch = new SearchServiceSearch(),
        private highlighter: SearchServiceHighlight = new SearchServiceHighlight(),
        private sorter: SearchServiceHighlight = new SearchServiceHighlight(),
        private searcher: SearchServiceSearch = new SearchServiceSearch()
    ) {}

    async search(options: SearchRequest) {
        console.log(`SearchService search ${options}`);
    }
}
