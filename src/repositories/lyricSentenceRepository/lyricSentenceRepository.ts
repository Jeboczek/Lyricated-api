import LyricSentenceModel from "../../models/database/api/translations/lyricSentenceModel";
import NotFoundError from "../../exceptions/notFoundError";
import Locale from "../../locale/locale";
import PutLyricSentenceRequest from "../../models/request/putLyricSentence";
import UpdateError from "../../exceptions/updateError";
import LangModel from "../../models/database/api/langModel";

export default class LyricSentenceRepository {
    async getLyricSentence(id: number): Promise<LyricSentenceModel> {
        const lyricSentence = await LyricSentenceModel.findByPk(id);

        if (lyricSentence === null)
            throw new NotFoundError(
                Locale.createNotFoundErrorText("LyricSentence")
            );

        return lyricSentence;
    }

    private async _checkIfLangExists(lang: string) {
        const langModel = await LangModel.findByPk(lang);

        if (langModel === null)
            throw new NotFoundError(Locale.createCreateObjectFirstText("Lang"));
    }

    async updateLyricSentence(
        id: number,
        request: PutLyricSentenceRequest
    ): Promise<LyricSentenceModel> {
        const lyricSentence = await LyricSentenceModel.findByPk(id);

        if (lyricSentence === null)
            throw new UpdateError(
                Locale.createNotFoundErrorText("LyricSentence")
            );

        const { lang, content } = request;

        this._checkIfLangExists(lang);

        try {
            return await lyricSentence.update({
                langId: lang,
                content: content,
            });
        } catch (e) {
            throw new UpdateError(
                Locale.createUpdateErrorText("LyricSentence")
            );
        }
    }
}
