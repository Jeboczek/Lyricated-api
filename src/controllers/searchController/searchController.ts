import { Body, Controller, Post, Response, Route, Security, Tags } from "tsoa";
import ErrorResponse from "../../models/response/errors/errorResponse";
import SearchResponse from "../../models/response/searchResponse";
import SearchRequest from "../../models/request/searchRequest";
import ChangeSearchResults from "./libs/changeSearchResults";
import CacheService from "../../services/cacheService/cacheService";
import SearchService from "../../services/searchService/searchService";

@Route("search")
@Tags("Search")
export class SearchController extends Controller {
    private service: SearchService;

    constructor(service?: SearchService) {
        super();
        this.service = service ?? new SearchService();
    }

    /**
     * Allows you to search using the given phrase.
     * All options under "filter_options" are optional. They can be not included or set to null.
     * You need "client" permission to use this endpoint.
     */
    @Post("")
    @Security("api_key", ["client"])
    @Response<SearchResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    async search(@Body() options: SearchRequest) {
        let cacheService: CacheService | undefined;
        if (CacheService.isCacheEnabled && !options.dont_use_cache) {
            cacheService = CacheService.getInstance();
            if (await cacheService.checkIfRequestIsInCache(options)) {
                return JSON.parse(
                    await cacheService.getRequestFromCache(options)
                ) as SearchResponse;
            }
        }
        options.search_phrase = options.search_phrase.toLowerCase();

        const searchResult = await this.service.search(options);

        const {
            from_lang_id: fromLang,
            to_lang_id: toLang,
            search_phrase: phrase,
        } = options;

        const toReturn = {
            from_lang_id: fromLang,
            to_lang_id: toLang,
            search_phrase: phrase,
            translations: searchResult.translations,
            handlers_time: searchResult.handlersTime,
            main_results: ChangeSearchResults.change(searchResult.mains),
            similar_results: ChangeSearchResults.change(searchResult.similar),
        } as SearchResponse;
        if (cacheService !== undefined)
            await cacheService.saveRequestResponseInCache(options, toReturn);
        return toReturn;
    }
}
