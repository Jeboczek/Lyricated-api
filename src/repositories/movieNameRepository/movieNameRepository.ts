import MovieNameModel from "../../models/database/api/translations/movieNameModel";
import NotFoundError from "../../exceptions/notFoundError";
import Locale from "../../locale/locale";

export default class MovieNameRepository {
    async getMovieName(id: number): Promise<MovieNameModel> {
        const movieName = await MovieNameModel.findByPk(id);

        if (movieName === null)
            throw new NotFoundError(
                Locale.createNotFoundErrorText("MovieName")
            );

        return movieName;
    }
}
