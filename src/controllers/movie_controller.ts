import { Controller, Get, Path, Query, Response, Route, Tags } from "tsoa";
import MovieResponse from "../models/response/movie_response";
import MovieRepository, { MovieType } from "../repositories/movie_repository";
import NotFoundResponse from "../models/response/errors/not_found_response";
import { injectable } from "tsyringe";

@injectable()
@Route("movies")
@Tags("Movie")
export class MovieController extends Controller {
    constructor(private repo: MovieRepository) {
        super();
    }

    @Get("find")
    @Response<MovieResponse>(200, "OK")
    public async getMovies(
        @Query() type: MovieType
    ): Promise<{ movies: MovieResponse[] }> {
        const movies = await this.repo.getMovies(type);

        return { movies: movies.map((e) => MovieResponse.fromModel(e)) };
    }

    @Get("{id}")
    @Path("id")
    @Response<MovieResponse>(200, "OK")
    @Response<NotFoundResponse>(404, "Not found")
    public async getMovie(id: number) {
        const movie = await this.repo.getMovie(id);

        if (movie != null) return MovieResponse.fromModel(movie);

        this.setStatus(404);
        return new NotFoundResponse("No video found with the given ID");
    }
}
