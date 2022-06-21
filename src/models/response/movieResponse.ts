import MovieNameResponse from "./translations/movieNameResponse";
import MovieModel from "../database/api/movieModel";
import EpisodeResponse from "./episodeResponse";

export default class MovieResponse {
    id: number;
    lang: string;
    type: "movie" | "serie";
    netflix_id?: number;
    minutes: number;
    movie_names: MovieNameResponse[];
    episodes: EpisodeResponse[];

    static fromModel(model: MovieModel): MovieResponse {
        const resp = new MovieResponse();

        const { id, lang, netflixId, minutes } = model;
        const episodes = model.episodes ?? [];
        const movieNames = model.movieNames ?? [];

        resp.id = id;
        resp.lang = lang?.id;
        resp.type = episodes.length === 0 ? "movie" : "serie";
        resp.netflix_id = netflixId;
        resp.minutes = minutes;
        resp.movie_names = movieNames?.map((e) =>
            MovieNameResponse.fromModel(e)
        );
        resp.episodes = episodes.map((e) => EpisodeResponse.fromModel(e));

        return resp;
    }
}
