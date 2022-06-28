import EpisodeModel from "../../models/database/api/episodeModel";
import PutEpisodeRequest from "../../models/request/putEpisodeRequest";
import UpdateError from "../../exceptions/updateError";
import DeleteError from "../../exceptions/deleteError";
import PostEpisodeRequest from "../../models/request/postEpisodeRequest";
import CreateError from "../../exceptions/createError";
import Locale from "../../locale/locale";
import NotFoundError from "../../exceptions/notFoundError";

export default class EpisodeRepository {
    async getEpisode(id: number): Promise<EpisodeModel> {
        const episode = await EpisodeModel.findByPk(id);

        if (episode === null)
            throw new NotFoundError(Locale.createNotFoundErrorText("Episode"));
        return episode;
    }

    async updateEpisode(
        id: number,
        request: PutEpisodeRequest
    ): Promise<EpisodeModel> {
        const episodeModel = await EpisodeModel.findByPk(id);

        if (episodeModel === null)
            throw new UpdateError(Locale.createNotFoundErrorText("Episode"));

        const { season, episode, netflixId } = request;

        try {
            return await episodeModel.update({
                episode,
                season,
                netflixId,
            });
        } catch (e) {
            throw new UpdateError(Locale.createUpdateErrorText("Episode"));
        }
    }

    async deleteEpisode(id: number): Promise<EpisodeModel> {
        const episode = await EpisodeModel.findByPk(id);
        if (episode === null)
            throw new DeleteError(Locale.createNotFoundErrorText("Episode"));

        try {
            await episode.destroy();
        } catch (e) {
            throw new DeleteError(Locale.createDeleteErrorText("Episode"));
        }
        return episode;
    }

    async createEpisode(request: PostEpisodeRequest): Promise<EpisodeModel> {
        const { episode, season, netflixId, movieId } = request;

        try {
            return await EpisodeModel.create({
                episode,
                season,
                netflixId,
                movieId,
            });
        } catch (e) {
            throw new CreateError(
                Locale.createCreateErrorText("Episode", "check the given movie")
            );
        }
    }
}
