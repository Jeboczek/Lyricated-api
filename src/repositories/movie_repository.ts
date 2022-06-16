import Movie_model from "../models/database/movie_model";
import Movie_name_model from "../models/database/translations/movie_name_model";
import Episode_model from "../models/database/episode_model";

export type MovieType = "only_movies" | "only_series" | null;

export default class Movie_repository {
    async getMovies(type: MovieType): Promise<Movie_model[]> {
        let movieModels = await Movie_model.findAll({
            include: [Episode_model, Movie_name_model],
        });

        if (type != null) {
            movieModels = movieModels.filter((e) => {
                if (type == "only_movies") return e.episodes.length === 0;
                if (type == "only_series") return e.episodes.length > 0;
            });
        }

        return movieModels;
    }

    async getMovie(movieId: number): Promise<Movie_model | null> {
        return await Movie_model.findOne({
            where: { id: movieId },
            include: [Episode_model, Movie_name_model],
        });
    }
}
