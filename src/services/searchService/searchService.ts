import SearchServiceSearchHandler from "./libs/handlers/searchServiceSearchHandler";
import SearchServiceHighlightHandler from "./libs/handlers/searchServiceHighlightHandler";
import SearchRequest from "../../models/request/searchRequest";
import SearchServiceFilterHandler from "./libs/handlers/searchServiceFilterHandler";
import SearchServiceState from "./interfaces/searchServiceState";
import SearchServiceTranslationsHandler from "./libs/handlers/searchServiceTranslationsHandler";
import SearchServiceSortHandler from "./libs/handlers/searchServiceSortHandler";

export default class SearchService {
    constructor(
        private searcher: SearchServiceSearchHandler = new SearchServiceSearchHandler(),
        private filterer: SearchServiceFilterHandler = new SearchServiceFilterHandler(),
        private highlighter: SearchServiceHighlightHandler = new SearchServiceHighlightHandler(),
        private translater: SearchServiceTranslationsHandler = new SearchServiceTranslationsHandler(),
        private sorter: SearchServiceSortHandler = new SearchServiceSortHandler()
    ) {}

    async search(options: SearchRequest): Promise<SearchServiceState> {
        const state: SearchServiceState = {
            mains: [],
            request: options,
            similar: [],
            translations: [],
            handlersTime: [],
        };

        const firstHandler = this.searcher;

        this.searcher
            .setNext(this.filterer)
            .setNext(this.translater)
            .setNext(this.highlighter)
            .setNext(this.sorter);

        return await firstHandler.handle(state);
    }
}
