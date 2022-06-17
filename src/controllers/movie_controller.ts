import { Controller, Get, Path, Query, Response, Route, Tags } from "tsoa";
import MovieResponse from "../models/response/movie_response";
import MovieRepository, { MovieType } from "../repositories/movie_repository";
import NotFoundResponse from "../models/response/errors/not_found_response";

@Route("movies")
@Tags("Movie")
export class MovieController extends Controller {
    @Get("find")
    @Response<MovieResponse>(200, "OK")
    public async getMovies(
        @Query() type: MovieType,
        config: { repo?: MovieRepository } = {}
    ): Promise<{ movies: MovieResponse[] }> {
        const repo = config.repo ?? new MovieRepository();
        const movies = await repo.getMovies(type);

        return { movies: movies.map((e) => MovieResponse.fromModel(e)) };
    }

    @Get("{id}")
    @Response<MovieResponse>(200, "OK")
    @Response<NotFoundResponse>(404, "Not found")
    public async getMovie(
        @Path("id") movieId: number,
        config: { repo?: MovieRepository } = {}
    ) {
        const repo = config.repo ?? new MovieRepository();
        const movie = await repo.getMovie(movieId);

        if (movie != null) return MovieResponse.fromModel(movie);

        this.setStatus(404);
        return new NotFoundResponse("No video found with the given ID");
    }
}
