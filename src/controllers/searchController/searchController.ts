import { Body, Controller, Post, Response, Route, Tags } from "tsoa";
import ErrorResponse from "../../models/response/errors/errorResponse";
import SearchResponse from "../../models/response/searchResponse";
import SearchRequest from "../../models/request/searchRequest";
import SearchService from "../../services/searchService/searchService";
import ChangeSearchResults from "./libs/changeSearchResults";

@Route("search")
@Tags("Search")
export class SearchController extends Controller {
    @Post("")
    @Response<SearchResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Not found")
    async search(@Body() options: SearchRequest) {
        const searchValue = await new SearchService().search(options);

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
            translations: [], // TODO: Implement this
            main_results: ChangeSearchResults.change(searchValue.mains),
            similar_results: ChangeSearchResults.change(searchValue.similar),
        };
    }
}
