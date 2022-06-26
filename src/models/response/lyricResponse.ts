import MovieResponse from "./movieResponse";
import LyricModel from "../database/api/lyricModel";
import LyricSentenceResponse from "./translations/lyricSentenceResponse";
import EpisodeResponse from "./episodeResponse";

export default class LyricResponse {
    public lyric_id: number;
    public movie: MovieResponse;
    public episode: EpisodeResponse | null;
    public minute: number;
    public quality: number | null;
    public sentences: LyricSentenceResponse[];

    static fromModel(model: LyricModel) {
        const resp = new LyricResponse();

        const { id, movie, minute, quality, sentences, episode } = model;

        resp.lyric_id = id;
        resp.movie = MovieResponse.fromModel(movie);
        resp.episode = EpisodeResponse.fromModel(episode);
        resp.quality = quality;
        resp.minute = minute;
        resp.sentences = sentences.map((e) =>
            LyricSentenceResponse.fromModel(e)
        );

        return resp;
    }
}
