import MovieResponse from "./movieResponse";
import LyricModel from "../database/api/lyricModel";
import LyricSentenceResponse from "./translations/lyricSentenceResponse";

export default class LyricResponse {
    public id: number;
    public movie: MovieResponse;
    public minutes: number;
    public quality: number | null;
    public sentences: LyricSentenceResponse[];

    static fromModel(model: LyricModel) {
        const resp = new LyricResponse();

        const { id, movie, minutes, quality, sentences } = model;

        resp.id = id;
        resp.movie = MovieResponse.fromModel(movie);
        resp.quality = quality;
        resp.minutes = minutes;
        resp.sentences = sentences.map((e) =>
            LyricSentenceResponse.fromModel(e)
        );

        return resp;
    }
}
