import { Controller, Get, Path, Query, Response, Route, Tags } from "tsoa";
import MovieResponse from "../models/response/movie.response";
import MovieRepository, { MovieType } from "../repositories/movieRepository";
import NotFoundResponse from "../models/response/errors/notFound.response";

@Route("movies")
@Tags("Movie")
export class MoviesController extends Controller {
    @Get("find")
    @Response<MovieResponse>(200, "OK")
    public async getMovies(
        @Query() type: MovieType
    ): Promise<{ movies: MovieResponse[] }> {
        const repo = new MovieRepository();
        const movies = await repo.getMovies(type);

        return { movies: movies.map((e) => MovieResponse.fromModel(e)) };
    }

    @Get("{id}")
    @Response<MovieResponse>(200, "OK")
    @Response<NotFoundResponse>(404, "Not found")
    public async getMovie(@Path("id") movieId: number) {
        const repo = new MovieRepository();
        const movie = await repo.getMovie(movieId);

        if (movie != null) return MovieResponse.fromModel(movie);

        this.setStatus(404);
        return new NotFoundResponse("No video found with the given ID");
    }
}
