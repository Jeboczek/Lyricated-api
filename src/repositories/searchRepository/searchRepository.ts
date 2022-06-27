import SearchHandler from "./libs/handlers/searchHandler";
import HighlightHandler from "./libs/handlers/highlightHandler";
import SearchRequest from "../../models/request/searchRequest";
import FilterHandler from "./libs/handlers/filterHandler";
import SearchRepositoryState from "./interfaces/searchRepositoryState";

export default class SearchRepository {
    constructor(
        private searcher: SearchHandler = new SearchHandler(),
        private filterer: FilterHandler = new FilterHandler(),
        private highlighter: HighlightHandler = new HighlightHandler(),
        private sorter: HighlightHandler = new HighlightHandler()
    ) {}

    async search(options: SearchRequest): Promise<SearchRepositoryState> {
        const state: SearchRepositoryState = {
            mains: [],
            request: options,
            similar: [],
            translations: [],
        };

        const firstHandler = this.searcher;

        this.searcher.setNext(this.filterer).setNext(this.highlighter);

        return await firstHandler.handle(state);
    }
}
