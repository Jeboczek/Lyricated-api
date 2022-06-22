import { Controller, Get, Response, Route, Tags } from "tsoa";
import ErrorResponse from "../../models/response/errors/errorResponse";
import SearchResponse from "../../models/response/searchResponse";

@Route("search")
@Tags("Search")
export class SearchController extends Controller {
    @Get("")
    @Response<SearchResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Not found")
    async search() {
        return new SearchResponse();
    }
}
