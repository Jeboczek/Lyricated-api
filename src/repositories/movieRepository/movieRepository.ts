import MovieModel from "../../models/database/api/movieModel";
import MovieNameModel from "../../models/database/api/translations/movieNameModel";
import EpisodeModel from "../../models/database/api/episodeModel";
import { PutMovieRequest } from "../../models/request/putMovieRequest";
import UpdateError from "../../exceptions/updateError";
import LangModel from "../../models/database/api/langModel";
import MovieType from "../../models/enums/movieTypeEnum";

export default class MovieRepository {
    async getMovies(type?: MovieType): Promise<MovieModel[]> {
        let movieModels = await MovieModel.findAll({
            include: [EpisodeModel, MovieNameModel],
        });

        if (type != null) {
            movieModels = movieModels.filter((e) => {
                if (type == MovieType.onlyMovies)
                    return e.episodes.length === 0;
                if (type == MovieType.onlySeries) return e.episodes.length > 0;
            });
        }

        return movieModels;
    }

    async getMovie(movieId: number): Promise<MovieModel | null> {
        return await MovieModel.findOne({
            where: { id: movieId },
            include: [EpisodeModel, MovieNameModel, LangModel],
        });
    }

    async updateMovie(
        id: number,
        newData: PutMovieRequest
    ): Promise<MovieModel> {
        const movieToUpdate = await MovieModel.findOne({
            where: { id },
            include: [EpisodeModel, MovieNameModel, LangModel],
        });
        const newLang = await LangModel.findOne({
            where: { id: newData.lang },
        });

        if (movieToUpdate === null)
            throw new UpdateError("Unable to find a movie with the given id");
        if (newLang === null)
            throw new UpdateError(
                "There is no language you provided, create it first"
            );

        return movieToUpdate.update({
            lang: newLang,
            minutes: newData.minutes,
            netflixId: newData.netflix_id,
        });
    }
}
