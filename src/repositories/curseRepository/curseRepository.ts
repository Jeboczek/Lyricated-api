import CurseModel from "../../models/database/api/curseModel";
import NotFoundError from "../../exceptions/notFoundError";
import PutCurseRequest from "../../models/request/putCurseRequest";
import UpdateError from "../../exceptions/updateError";
import PostCurseRequest from "../../models/request/postCurseRequest";
import DeleteError from "../../exceptions/deleteError";
import CreateError from "../../exceptions/createError";
import Locale from "../../locale/locale";

export default class CurseRepository {
    async getCurses(onlyLang?: string): Promise<CurseModel[]> {
        let where = {};
        if (onlyLang !== undefined) where = { langId: onlyLang };
        return await CurseModel.findAll({ where });
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
            throw new UpdateError(Locale.createNotFoundErrorText("Curse"));

        const { lang: langId, content } = request;

        try {
            return await curse.update({
                langId,
                content,
            });
        } catch (e) {
            throw new UpdateError(Locale.createUpdateErrorText("Curse"));
        }
    }

    async createCurse(request: PostCurseRequest): Promise<CurseModel> {
        const { content, lang } = request;

        try {
            return await CurseModel.create({
                content,
                langId: lang,
            });
        } catch (e) {
            throw new CreateError(
                Locale.createCreateErrorText(
                    "Curse",
                    "check the language provided"
                )
            );
        }
    }

    async deleteCurse(id: number): Promise<CurseModel> {
        const curse = await CurseModel.findByPk(id);

        if (curse === null)
            throw new DeleteError(Locale.createNotFoundErrorText("Curse"));

        try {
            await curse.destroy();
        } catch (e) {
            throw new DeleteError(Locale.createDeleteErrorText("Curse"));
        }

        return curse;
    }
}
