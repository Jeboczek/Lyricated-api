import { Controller, Get, Path, Query, Response, Route, Tags } from "tsoa";
import MovieResponse from "../models/response/movieResponse";
import MovieRepository, { MovieType } from "../repositories/movieRepository";
import NotFoundResponse from "../models/response/errors/notFoundResponse";

@Route("movies")
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
    @Response<NotFoundResponse>(404, "Not found")
    public async getMovie(@Path("id") movieId: number) {
        const movie = await this.repo.getMovie(movieId);

        if (movie != null) return MovieResponse.fromModel(movie);

        // If not found
        this.setStatus(404);
        const notFoundResp = new NotFoundResponse(
            {
                params: JSON.stringify({ id: movieId }),
                path: "/movies/find",
                stack: undefined,
            },
            "A movie with the specified ID cannot be found"
        );
        await notFoundResp.save();
        return notFoundResp.toJson();
    }
}
