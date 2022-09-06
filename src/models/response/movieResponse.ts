import MovieTitleResponse from "./translations/movieTitleResponse";
import MovieModel from "../database/api/movieModel";
import EpisodeResponse from "./episodeResponse";

export default class MovieResponse {
    movie_id: number;
    lang: string;
    type: "movie" | "serie";
    netflix_id?: number;
    minutes: number;
    movie_titles: MovieTitleResponse[];
    episodes: EpisodeResponse[];

    static fromModel(model: MovieModel): MovieResponse {
        const resp = new MovieResponse();

        const { id, lang, netflixId, minutes } = model;
        const episodes = model.episodes ?? [];
        const movieNames = model.movieNames ?? [];

        resp.movie_id = id;
        resp.lang = lang?.id;
        resp.type = episodes.length === 0 ? "movie" : "serie";
        resp.netflix_id = netflixId;
        resp.minutes = minutes;
        resp.movie_titles = movieNames?.map((e) =>
            MovieTitleResponse.fromModel(e)
        );
        resp.episodes = episodes.map((e) => EpisodeResponse.fromModel(e));

        return resp;
    }
}
