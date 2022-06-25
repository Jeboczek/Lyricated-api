import { Body, Controller, Post, Response, Route, Tags } from "tsoa";
import ErrorResponse from "../../models/response/errors/errorResponse";
import SearchResponse from "../../models/response/searchResponse";
import SearchRequest from "../../models/request/searchRequest";
import SearchService from "../../services/searchService/searchService";

@Route("search")
@Tags("Search")
export class SearchController extends Controller {
    @Post("")
    @Response<SearchResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Not found")
    async search(@Body() options: SearchRequest) {
        return await new SearchService().search(options);
    }
}
