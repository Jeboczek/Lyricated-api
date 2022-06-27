import EpisodeModel from "../../models/database/api/episodeModel";
import PutEpisodeRequest from "../../models/request/putEpisodeRequest";
import UpdateError from "../../exceptions/updateError";
import DeleteError from "../../exceptions/deleteError";

export default class EpisodeRepository {
    getEpisode(id: number): Promise<EpisodeModel | null> {
        return EpisodeModel.findByPk(id);
    }

    async updateEpisode(
        id: number,
        request: PutEpisodeRequest
    ): Promise<EpisodeModel> {
        const episodeModel = await EpisodeModel.findByPk(id);

        if (episodeModel === null)
            throw new UpdateError("There is no EpisodeModel with the given id");

        const { season, episode, netflixId } = request;
        episodeModel.episode = episode;
        episodeModel.season = season;
        episodeModel.netflixId = netflixId;

        return await episodeModel.save();
    }

    async deleteEpisode(id: number): Promise<EpisodeModel> {
        const episode = await EpisodeModel.findByPk(id);
        if (episode === null)
            throw new DeleteError("There is no EpisodeModel with the given id");

        await episode.destroy();
        return episode;
    }
}
