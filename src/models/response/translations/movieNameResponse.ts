import MovieNameModel from "../../database/api/translations/movieNameModel";

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
