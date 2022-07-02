import { Body, Controller, Post, Response, Route, Tags } from "tsoa";
import ErrorResponse from "../../models/response/errors/errorResponse";
import SearchResponse from "../../models/response/searchResponse";
import SearchRequest from "../../models/request/searchRequest";
import ChangeSearchResults from "./libs/changeSearchResults";
import SearchRepository from "../../repositories/searchRepository/searchRepository";

@Route("search")
@Tags("Search")
export class SearchController extends Controller {
    private repo: SearchRepository;

    constructor(repo?: SearchRepository) {
        super();
        this.repo = repo ?? new SearchRepository();
    }

    @Post("")
    @Response<SearchResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    async search(@Body() options: SearchRequest) {
        options.search_phase = options.search_phase.toLowerCase();

        const searchResult = await this.repo.search(options);

        const {
            from_lang_id: fromLang,
            to_lang_id: toLang,
            search_phase: phase,
        } = options;

        return {
            from_lang_id: fromLang,
            to_lang_id: toLang,
            search_phase: phase,
            cached: false, // TODO: Implement this
            translations: searchResult.translations,
            handlers_time: searchResult.handlersTime,
            main_results: ChangeSearchResults.change(searchResult.mains),
            similar_results: ChangeSearchResults.change(searchResult.similar),
        };
    }
}
