import LangModel from "../../models/database/api/langModel";
import CreateError from "../../exceptions/createError";
import Locale from "../../locale/locale";

export default class LangRepository {
    async createLang(lang: string): Promise<LangModel> {
        try {
            const langModel = LangModel.build({ id: lang });
            return await langModel.save();
        } catch (e) {
            throw new CreateError(Locale.createCreateErrorText("Lang"));
        }
    }
}
