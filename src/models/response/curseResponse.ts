import CurseModel from "../database/api/curseModel";

export default class CurseResponse {
    public id: number;
    public content: string;
    public lang: string;

    static fromModel(model: CurseModel) {
        const resp = new CurseResponse();

        const { id, content, langId } = model;
        resp.id = id;
        resp.content = content;
        resp.lang = langId;

        return resp;
    }
}
