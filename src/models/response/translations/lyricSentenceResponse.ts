import LyricSentenceModel from "../../database/api/translations/lyricSentenceModel";

export default class LyricSentenceResponse {
    public id: number;
    public lang: string;
    public content: string;

    static fromModel(model: LyricSentenceModel) {
        const resp = new LyricSentenceResponse();
        const { id, langId, content } = model;

        resp.id = id;
        resp.lang = langId;
        resp.content = content;

        return resp;
    }
}
