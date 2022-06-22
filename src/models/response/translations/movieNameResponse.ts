import MovieNameModel from "../../database/api/translations/movieNameModel";

export default class MovieNameResponse {
    movie_name_id: number;
    lang: string;
    content: string;

    static fromModel(model: MovieNameModel): MovieNameResponse {
        const resp = new MovieNameResponse();

        resp.movie_name_id = model.id;
        resp.lang = model.langId;
        resp.content = model.content;

        return resp;
    }
}
