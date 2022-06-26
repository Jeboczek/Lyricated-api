import MovieResponse from "./movieResponse";
import LyricModel from "../database/api/lyricModel";
import LyricSentenceResponse from "./translations/lyricSentenceResponse";
import EpisodeResponse from "./episodeResponse";

export default class LyricResponse {
    public lyric_id: number;
    public movie: MovieResponse;
    public episode: EpisodeResponse | null;
    public seconds: number;
    public quality: number | null;
    public sentences: LyricSentenceResponse[];

    static fromModel(model: LyricModel) {
        const resp = new LyricResponse();

        const { id, movie, seconds, quality, sentences, episode } = model;

        resp.lyric_id = id;
        resp.movie = MovieResponse.fromModel(movie);
        resp.episode = episode ? EpisodeResponse.fromModel(episode) : null;
        resp.quality = quality;
        resp.seconds = seconds;
        resp.sentences = sentences.map((e) =>
            LyricSentenceResponse.fromModel(e)
        );

        return resp;
    }
}
