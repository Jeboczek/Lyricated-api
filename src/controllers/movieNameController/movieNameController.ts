import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Put,
    Response,
    Route,
    Security,
    Tags,
} from "tsoa";
import ErrorResponse from "../../models/response/errors/errorResponse";
import MovieNameRepository from "../../repositories/movieNameRepository/movieNameRepository";
import MovieNameResponse from "../../models/response/translations/movieNameResponse";
import PutMovieNameRequest from "../../models/request/putMovieNameRequest";
import PostMovieNameRequest from "../../models/request/postMovieNameRequest";

@Route("movie-name")
@Tags("MovieName")
export class MovieNameController extends Controller {
    private repo: MovieNameRepository;

    constructor(repo?: MovieNameRepository) {
        super();
        this.repo = repo ?? new MovieNameRepository();
    }

    @Post("new")
    @Security("apiKey", ["contributor"])
    @Response<MovieNameResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async postMovieName(@Body() request: PostMovieNameRequest) {
        const movieName = await this.repo.createMovieName(request);

        return MovieNameResponse.fromModel(movieName);
    }

    @Get("{id}")
    @Security("apiKey", ["client"])
    @Response<MovieNameResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async getMovieName(@Path("id") id: number) {
        const movieName = await this.repo.getMovieName(id);

        return MovieNameResponse.fromModel(movieName);
    }

    @Put("{id}")
    @Security("apiKey", ["contributor"])
    @Response<MovieNameResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async putMovieName(
        @Path("id") id: number,
        @Body() request: PutMovieNameRequest
    ) {
        const movieName = await this.repo.updateMovieName(id, request);

        return MovieNameResponse.fromModel(movieName);
    }

    @Delete("{id}")
    @Security("apiKey", ["contributor"])
    @Response<MovieNameResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async deleteMovieName(@Path("id") id: number) {
        const movieName = await this.repo.deleteMovieName(id);

        return MovieNameResponse.fromModel(movieName);
    }
}
