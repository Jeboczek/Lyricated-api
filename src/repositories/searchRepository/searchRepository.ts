import SearchRepositorySearchHandler from "./libs/handlers/searchRepositorySearchHandler";
import SearchRepositoryHighlightHandler from "./libs/handlers/searchRepositoryHighlightHandler";
import SearchRequest from "../../models/request/searchRequest";
import SearchRepositoryFilterHandler from "./libs/handlers/searchRepositoryFilterHandler";
import SearchRepositoryState from "./interfaces/searchRepositoryState";
import SearchRepositoryTranslationsHandler from "./libs/handlers/searchRepositoryTranslationsHandler";
import SearchRepositorySortHandler from "./libs/handlers/searchRepositorySortHandler";

export default class SearchRepository {
    constructor(
        private searcher: SearchRepositorySearchHandler = new SearchRepositorySearchHandler(),
        private filterer: SearchRepositoryFilterHandler = new SearchRepositoryFilterHandler(),
        private highlighter: SearchRepositoryHighlightHandler = new SearchRepositoryHighlightHandler(),
        private translater: SearchRepositoryTranslationsHandler = new SearchRepositoryTranslationsHandler(),
        private sorter: SearchRepositorySortHandler = new SearchRepositorySortHandler()
    ) {}

    async search(options: SearchRequest): Promise<SearchRepositoryState> {
        const state: SearchRepositoryState = {
            mains: [],
            request: options,
            similar: [],
            translations: [],
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
