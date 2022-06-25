import SearchServiceFilter from "./libs/searchServiceFilter";
import SearchServiceHighlight from "./libs/searchServiceHighlight";
import SearchRequest from "../../models/request/searchRequest";

export default class SearchService {
    constructor(
        private filter: SearchServiceFilter = new SearchServiceFilter(),
        private highlighter: SearchServiceHighlight = new SearchServiceHighlight(),
        private sorter: SearchServiceHighlight = new SearchServiceHighlight()
    ) {}

    async search(options: SearchRequest) {
        console.log(`SearchService search ${options}`);
    }
}
