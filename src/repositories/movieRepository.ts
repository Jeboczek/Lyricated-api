import MovieModel from "../models/database/movie.model";
import MovieNameModel from "../models/database/translations/movieNameModel";

export interface MovieRepositoryOptions {
    movieModel: new () => MovieModel;
    movieNameModel: new () => MovieNameModel;
}

export default class MovieRepository {
    private movieModel: new () => MovieModel;
    private movieNameModel: new () => MovieNameModel;

    constructor(config: MovieRepositoryOptions) {
        const { movieModel, movieNameModel } = config;

        this.movieModel = movieModel;
        this.movieNameModel = movieNameModel;
    }
}
