import { Controller, Get, Path, Query, Route, Tags } from "tsoa";
import MovieResponse from "../models/response/movie.response";
import MovieRepository, { MovieType } from "../repositories/movieRepository";

@Route("movies")
@Tags("Movie")
export class MoviesController extends Controller {
    @Get("find")
    public async getMovies(
        @Query() type: MovieType
    ): Promise<{ movies: MovieResponse[] }> {
        const repo = new MovieRepository();
        const movies = await repo.getMovies(type);

        return { movies: movies.map((e) => MovieResponse.fromModel(e)) };
    }

    @Get("{id}")
    public async getMovie(@Path("id") movieId: number) {
        const repo = new MovieRepository();
        const movie = await repo.getMovie(movieId);

        if (movie != null) return MovieResponse.fromModel(movie);

        this.setStatus(404);
        return new MovieResponse();
    }
}
