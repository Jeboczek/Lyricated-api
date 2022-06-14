import MovieModel from "../models/database/movie.model";
import MovieNameModel from "../models/database/translations/movieNameModel";
import EpisodeModel from "../models/database/episode.model";

export type MovieType = "only_movies" | "only_series" | null;

export default class MovieRepository {
    async getMovies(type: MovieType): Promise<MovieModel[]> {
        let movieModels = await MovieModel.findAll({
            include: [EpisodeModel, MovieNameModel],
        });

        if (type != null) {
            movieModels = movieModels.filter((e) => {
                if (type == "only_movies") return e.episodes.length === 0;
                if (type == "only_series") return e.episodes.length > 0;
            });
        }

        return movieModels;
    }

    async getMovie(movieId: number): Promise<MovieModel | null> {
        return await MovieModel.findOne({
            where: { id: movieId },
            include: [EpisodeModel, MovieNameModel],
        });
    }
}
