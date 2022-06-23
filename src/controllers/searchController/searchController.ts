import { Body, Controller, Post, Response, Route, Tags } from "tsoa";
import ErrorResponse from "../../models/response/errors/errorResponse";
import SearchResponse from "../../models/response/searchResponse";
import SearchRequest from "../../models/request/searchRequest";

@Route("search")
@Tags("Search")
export class SearchController extends Controller {
    @Post("")
    @Response<SearchResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Not found")
    async search(@Body() options: SearchRequest) {
        return new SearchResponse();
    }
}
