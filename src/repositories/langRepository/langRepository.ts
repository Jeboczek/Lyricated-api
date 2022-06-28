import LangModel from "../../models/database/api/langModel";
import CreateError from "../../exceptions/createError";
import Locale from "../../locale/locale";
import DeleteError from "../../exceptions/deleteError";

export default class LangRepository {
    async createLang(lang: string): Promise<LangModel> {
        try {
            const langModel = LangModel.build({ id: lang });
            return await langModel.save();
        } catch (e) {
            throw new CreateError(Locale.createCreateErrorText("Lang"));
        }
    }

    async deleteLang(lang: string): Promise<LangModel> {
        const langModel = await LangModel.findByPk(lang);
        if (langModel === null)
            throw new DeleteError(Locale.createNotFoundErrorText("Lang"));

        try {
            await langModel.destroy();
            return langModel;
        } catch (e) {
            throw new DeleteError(Locale.createDeleteErrorText("Lang"));
        }
    }

    async getLangs(): Promise<LangModel[]> {
        return await LangModel.findAll();
    }
}
