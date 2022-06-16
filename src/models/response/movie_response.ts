import Movie_name_response from "./translations/movie_name_response";
import Movie_model from "../database/movie_model";

export default class Movie_response {
    id: number;
    lang: string;
    type: "movie" | "serie";
    netflix_id?: number;
    minutes: number;
    movie_names: Movie_name_response[];

    static fromModel(model: Movie_model): Movie_response {
        const resp = new Movie_response();

        resp.id = model.id;
        resp.lang = model.lang.id;
        resp.type = model.episodes.length === 0 ? "movie" : "serie";
        resp.netflix_id = model.netflixId;
        resp.minutes = model.minutes;
        resp.movie_names = model.movieNames.map((e) =>
            Movie_name_response.fromModel(e)
        );

        return resp;
    }
}
