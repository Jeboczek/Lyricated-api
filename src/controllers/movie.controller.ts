import { Controller, Get, Query, Route } from "tsoa";
import MovieResponse from "../models/response/movie.response";
import MovieModel from "../models/database/movie.model";
import EpisodeModel from "../models/database/episode.model";
import MovieNameModel from "../models/database/translations/movieNameModel";

@Route("get_movies")
export class MovieController extends Controller {
    @Get("")
    public async getMovie(
        @Query() source?: "only_movies" | "only_series"
    ): Promise<{ movies: MovieResponse[] }> {
        let movieModels = await MovieModel.findAll({
            include: [EpisodeModel, MovieNameModel],
        });

        if (source != null) {
            movieModels = movieModels.filter((e) => {
                if (source == "only_movies") return e.episodes.length === 0;
                if (source == "only_series") return e.episodes.length > 0;
            });
        }

        return { movies: movieModels.map((e) => MovieResponse.fromModel(e)) };
    }
}
