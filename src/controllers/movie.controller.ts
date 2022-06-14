import { Controller, Get, Query, Route, Tags } from "tsoa";
import MovieResponse from "../models/response/movie.response";
import MovieRepository, { MovieType } from "../repositories/movieRepository";

@Route("get_movies")
@Tags("Movie")
export class MovieController extends Controller {
    @Get("Get list of Movies")
    public async getMovies(
        @Query() type: MovieType
    ): Promise<{ movies: MovieResponse[] }> {
        const repo = new MovieRepository();
        const movies = await repo.getMovies(type);

        return { movies: movies.map((e) => MovieResponse.fromModel(e)) };
    }

    @Get("Get specific movie")
    public async getMovie(@Query("movie_id") movieId: number) {
        const repo = new MovieRepository();
        const movie = await repo.getMovie(movieId);

        if (movie != null) return MovieResponse.fromModel(movie);

        this.setStatus(404);
        return new MovieResponse();
    }
}
