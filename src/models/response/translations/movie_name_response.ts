import Movie_name_model from "../../database/translations/movie_name_model";

export default class Movie_name_response {
    lang: string;
    content: string;

    static fromModel(model: Movie_name_model): Movie_name_response {
        const resp = new Movie_name_response();

        resp.lang = model.langId;
        resp.content = model.content;

        return resp;
    }
}
