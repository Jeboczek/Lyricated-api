import MovieNameModel from "../../models/database/api/translations/movieNameModel";
import NotFoundError from "../../exceptions/notFoundError";
import Locale from "../../locale/locale";
import PutMovieNameRequest from "../../models/request/putMovieNameRequest";
import UpdateError from "../../exceptions/updateError";
import LangModel from "../../models/database/api/langModel";
import DeleteError from "../../exceptions/deleteError";
import PostMovieNameRequest from "../../models/request/postMovieNameRequest";
import CreateError from "../../exceptions/createError";
import MovieModel from "../../models/database/api/movieModel";

export default class MovieNameRepository {
    async getMovieName(id: number): Promise<MovieNameModel> {
        const movieName = await MovieNameModel.findByPk(id);

        if (movieName === null)
            throw new NotFoundError(
                Locale.createNotFoundErrorText("MovieName")
            );

        return movieName;
    }

    private async _checkIfLangModelExists(lang: string) {
        const langModel = await LangModel.findByPk(lang);
        if (langModel === null)
            throw new NotFoundError(Locale.createCreateObjectFirstText("Lang"));
    }

    private async _checkIfMovieModelExists(id: number) {
        const movieModel = await MovieModel.findByPk(id);
        if (movieModel === null)
            throw new NotFoundError(
                Locale.createCreateObjectFirstText("Movie")
            );
    }

    async updateMovieName(
        id: number,
        request: PutMovieNameRequest
    ): Promise<MovieNameModel> {
        const { lang, content, movieId } = request;
        const movieName = await MovieNameModel.findByPk(id);

        if (movieName === null)
            throw new UpdateError(Locale.createNotFoundErrorText("MovieName"));
        await this._checkIfLangModelExists(lang);
        await this._checkIfMovieModelExists(movieId);

        movieName.content = content;
        movieName.langId = lang;
        movieName.movieId = movieId;

        try {
            return await movieName.save();
        } catch (e) {
            throw new UpdateError(Locale.createUpdateErrorText("MovieName"));
        }
    }

    async deleteMovieName(id: number): Promise<MovieNameModel> {
        const movieName = await MovieNameModel.findByPk(id);

        if (movieName === null)
            throw new DeleteError(Locale.createNotFoundErrorText("MovieName"));

        try {
            await movieName.destroy();
            return movieName;
        } catch (e) {
            throw new DeleteError(Locale.createDeleteErrorText("MovieName"));
        }
    }

    async createMovieName(
        request: PostMovieNameRequest
    ): Promise<MovieNameModel> {
        const { lang, content, movieId } = request;

        await this._checkIfLangModelExists(lang);
        await this._checkIfMovieModelExists(movieId);

        try {
            const movieName = MovieNameModel.build({
                lang,
                content,
                movieId,
            });
            return await movieName.save();
        } catch (e) {
            throw new CreateError(Locale.createCreateErrorText("MovieName"));
        }
    }
}
