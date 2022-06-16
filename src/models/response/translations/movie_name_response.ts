import MovieNameModel from "../../database/translations/movie_name_model";

export default class MovieNameResponse {
    lang: string;
    content: string;

    static fromModel(model: MovieNameModel): MovieNameResponse {
        const resp = new MovieNameResponse();

        resp.lang = model.langId;
        resp.content = model.content;

        return resp;
    }
}
