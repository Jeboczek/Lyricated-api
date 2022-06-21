import { Controller, Get, Path, Query, Response, Route, Tags } from "tsoa";
import MovieResponse from "../../models/response/movieResponse";
import MovieRepository, {
    MovieType,
} from "../../repositories/movieRepository/movieRepository";
import ErrorResponse from "../../models/response/errors/errorResponse";
import NotFoundError from "../../exceptions/notFoundError";

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

    @Get("{id}")
    @Response<MovieResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Not found")
    public async getMovie(@Path("id") movieId: number) {
        const movie = await this.repo.getMovie(movieId);

        if (movie != null) return MovieResponse.fromModel(movie);

        throw new NotFoundError();
    }
}
