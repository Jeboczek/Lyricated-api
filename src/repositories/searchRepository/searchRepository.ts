import SearchRepositorySearchHandler from "./libs/handlers/searchRepositorySearchHandler";
import SearchRepositoryHighlightHandler from "./libs/handlers/searchRepositoryHighlightHandler";
import SearchRequest from "../../models/request/searchRequest";
import SearchRepositoryFilterHandler from "./libs/handlers/searchRepositoryFilterHandler";
import SearchRepositoryState from "./interfaces/searchRepositoryState";

export default class SearchRepository {
    constructor(
        private searcher: SearchRepositorySearchHandler = new SearchRepositorySearchHandler(),
        private filterer: SearchRepositoryFilterHandler = new SearchRepositoryFilterHandler(),
        private highlighter: SearchRepositoryHighlightHandler = new SearchRepositoryHighlightHandler(),
        private sorter: SearchRepositoryHighlightHandler = new SearchRepositoryHighlightHandler()
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
