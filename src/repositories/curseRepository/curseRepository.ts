import CurseModel from "../../models/database/api/curseModel";
import NotFoundError from "../../exceptions/notFoundError";
import PutCurseRequest from "../../models/request/putCurseRequest";
import UpdateError from "../../exceptions/updateError";
import PostCurseRequest from "../../models/request/postCurseRequest";

export default class CurseRepository {
    async getCurses(): Promise<CurseModel[]> {
        return await CurseModel.findAll();
    }

    async getCurse(id: number): Promise<CurseModel> {
        const curse = await CurseModel.findOne({
            where: {
                id,
            },
        });

        if (curse === null) throw new NotFoundError();
        return curse;
    }

    async updateCurse(
        id: number,
        request: PutCurseRequest
    ): Promise<CurseModel> {
        const curse = await CurseModel.findOne({
            where: {
                id,
            },
        });

        if (curse === null)
            throw new UpdateError("There is no CurseModel with the given id");

        const { lang, content } = request;
        curse.langId = lang;
        curse.content = content;

        return await curse.save();
    }

    async addCurse(request: PostCurseRequest): Promise<CurseModel> {
        const { content, lang } = request;

        return await CurseModel.create({
            content,
            langId: lang,
        });
    }
}
