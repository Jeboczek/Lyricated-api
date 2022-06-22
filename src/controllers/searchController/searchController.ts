import { Controller, Get, Response, Route, Tags } from "tsoa";
import MovieResponse from "../../models/response/movieResponse";
import ErrorResponse from "../../models/response/errors/errorResponse";

@Route("search")
@Tags("Search")
export class SearchController extends Controller {
    @Get("")
    @Response<MovieResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Not found")
    async search() {}
}
