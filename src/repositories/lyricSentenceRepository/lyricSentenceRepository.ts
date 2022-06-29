import LyricSentenceModel from "../../models/database/api/translations/lyricSentenceModel";
import NotFoundError from "../../exceptions/notFoundError";
import Locale from "../../locale/locale";
import PutLyricSentenceRequest from "../../models/request/putLyricSentenceRequest";
import UpdateError from "../../exceptions/updateError";
import LangModel from "../../models/database/api/langModel";
import { PostLyricSentenceRequest } from "../../models/request/postLyricSentenceRequest";
import LyricModel from "../../models/database/api/lyricModel";
import CreateError from "../../exceptions/createError";

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

    private async _checkIfLyricExists(id: number) {
        const lyricModel = await LyricModel.findByPk(id);

        if (lyricModel === null)
            throw new NotFoundError(Locale.createNotFoundErrorText("Lyric"));
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

        await this._checkIfLangExists(lang);

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

    async createLyricSentence(
        request: PostLyricSentenceRequest
    ): Promise<LyricSentenceModel> {
        const { lang, lyricId, content } = request;

        await this._checkIfLangExists(lang);
        await this._checkIfLyricExists(lyricId);

        try {
            return await LyricSentenceModel.create({
                langId: lang,
                lyricId,
                content,
            });
        } catch (e) {
            throw new CreateError(
                Locale.createCreateErrorText("LyricSentence")
            );
        }
    }
}
