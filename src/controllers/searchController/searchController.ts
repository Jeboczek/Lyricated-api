import { Body, Controller, Post, Response, Route, Security, Tags } from "tsoa";
import ErrorResponse from "../../models/response/errors/errorResponse";
import SearchResponse from "../../models/response/searchResponse";
import SearchRequest from "../../models/request/searchRequest";
import ChangeSearchResults from "./libs/changeSearchResults";
import SearchRepository from "../../repositories/searchRepository/searchRepository";
import CacheService from "../../services/cacheService/cacheService";

@Route("search")
@Tags("Search")
export class SearchController extends Controller {
    private repo: SearchRepository;

    constructor(repo?: SearchRepository) {
        super();
        this.repo = repo ?? new SearchRepository();
    }

    @Post("")
    @Security("apiKey", ["client"])
    @Response<SearchResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    async search(@Body() options: SearchRequest) {
        let cacheService: CacheService | undefined;
        if (CacheService.isCacheEnabled && !options.dont_use_cache) {
            cacheService = CacheService.getInstance();
            if (await cacheService.checkIfRequestIsInCache(options)) {
                return JSON.parse(
                    await cacheService.getRequestFromCache(options)
                );
            }
        }
        options.search_phase = options.search_phase.toLowerCase();

        const searchResult = await this.repo.search(options);

        const {
            from_lang_id: fromLang,
            to_lang_id: toLang,
            search_phase: phase,
        } = options;

        const toReturn = {
            from_lang_id: fromLang,
            to_lang_id: toLang,
            search_phase: phase,
            translations: searchResult.translations,
            handlers_time: searchResult.handlersTime,
            main_results: ChangeSearchResults.change(searchResult.mains),
            similar_results: ChangeSearchResults.change(searchResult.similar),
        };
        if (cacheService !== undefined)
            await cacheService.saveRequestResponseInCache(options, toReturn);
        return toReturn;
    }
}
