import EpisodeModel from "../database/api/episodeModel";

export default class EpisodeResponse {
    season: number;
    episode: number;
    netflixId: number;

    static fromModel(model: EpisodeModel) {
        const resp = new EpisodeResponse();

        resp.episode = model.episode;
        resp.season = model.season;
        resp.netflixId = model.netflixId;

        return resp;
    }
}
