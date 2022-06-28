import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Put,
    Query,
    Response,
    Route,
    Tags,
} from "tsoa";
import MovieResponse from "../../models/response/movieResponse";
import MovieRepository from "../../repositories/movieRepository/movieRepository";
import ErrorResponse from "../../models/response/errors/errorResponse";
import { PutMovieRequest } from "../../models/request/putMovieRequest";
import MovieType from "../../models/enums/movieTypeEnum";
import { PostMovieRequest } from "../../models/request/postMovieRequest";

@Route("movie")
@Tags("Movie")
export class MovieController extends Controller {
    private repo: MovieRepository;

    constructor(repo?: MovieRepository) {
        super();
        this.repo = repo ?? new MovieRepository();
    }

    @Get("find")
    @Response<MovieResponse>(200, "OK")
    public async getMovies(
        @Query() type?: MovieType
    ): Promise<{ movies: MovieResponse[] }> {
        const movies = await this.repo.getMovies(type);

        return { movies: movies.map((e) => MovieResponse.fromModel(e)) };
    }

    @Post("new")
    @Response<MovieResponse>(200, "OK")
    public async createMovie(@Body() request: PostMovieRequest) {
        const movie = await this.repo.createMovie(request);

        return MovieResponse.fromModel(movie);
    }

    @Get("{id}")
    @Response<MovieResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async getMovie(@Path("id") movieId: number) {
        const movie = await this.repo.getMovie(movieId);

        return MovieResponse.fromModel(movie);
    }

    @Put("{id}")
    @Response<MovieResponse>(200, "OK")
    public async putMovie(
        @Path("id") movieId: number,
        @Body() request: PutMovieRequest
    ) {
        const updatedMovie = await this.repo.updateMovie(movieId, request);

        return MovieResponse.fromModel(updatedMovie);
    }

    @Delete("{id}")
    @Response<MovieResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async deleteMovie(@Path("id") movieId: number) {
        const movie = await this.repo.deleteMovie(movieId);

        return MovieResponse.fromModel(movie);
    }
}
