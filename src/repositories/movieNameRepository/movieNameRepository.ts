import MovieNameModel from "../../models/database/api/translations/movieNameModel";
import NotFoundError from "../../exceptions/notFoundError";
import Locale from "../../locale/locale";
import PutMovieName from "../../models/request/putMovieName";
import UpdateError from "../../exceptions/updateError";
import LangModel from "../../models/database/api/langModel";
import DeleteError from "../../exceptions/deleteError";

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
            throw new UpdateError(Locale.createCreateObjectFirstText("Lang"));
    }

    async updateMovieName(
        id: number,
        request: PutMovieName
    ): Promise<MovieNameModel> {
        const { lang, content } = request;
        const movieName = await MovieNameModel.findByPk(id);

        if (movieName === null)
            throw new UpdateError(Locale.createNotFoundErrorText("MovieName"));
        await this._checkIfLangModelExists(lang);

        movieName.content = content;
        movieName.langId = lang;

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
}
