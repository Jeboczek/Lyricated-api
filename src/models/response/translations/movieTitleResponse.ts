import MovieNameModel from "../../database/api/translations/movieNameModel";

export default class MovieTitleResponse {
    movie_title_id: number;
    lang: string;
    content: string;

    static fromModel(model: MovieNameModel): MovieTitleResponse {
        const resp = new MovieTitleResponse();

        resp.movie_title_id = model.id;
        resp.lang = model.langId;
        resp.content = model.content;

        return resp;
    }
}
