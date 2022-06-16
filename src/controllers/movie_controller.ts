import { Controller, Get, Path, Query, Response, Route, Tags } from "tsoa";
import Movie_response from "../models/response/movie_response";
import Movie_repository, { MovieType } from "../repositories/movie_repository";
import Not_found_response from "../models/response/errors/not_found_response";

@Route("movies")
@Tags("Movie")
export class MovieController extends Controller {
    @Get("find")
    @Response<Movie_response>(200, "OK")
    public async getMovies(
        @Query() type: MovieType,
        config: { repo?: Movie_repository } = {}
    ): Promise<{ movies: Movie_response[] }> {
        const repo = config.repo ?? new Movie_repository();
        const movies = await repo.getMovies(type);

        return { movies: movies.map((e) => Movie_response.fromModel(e)) };
    }

    @Get("{id}")
    @Response<Movie_response>(200, "OK")
    @Response<Not_found_response>(404, "Not found")
    public async getMovie(
        @Path("id") movieId: number,
        config: { repo?: Movie_repository } = {}
    ) {
        const repo = config.repo ?? new Movie_repository();
        const movie = await repo.getMovie(movieId);

        if (movie != null) return Movie_response.fromModel(movie);

        this.setStatus(404);
        return new Not_found_response("No video found with the given ID");
    }
}
