import LyricSentenceModel from "../../models/database/api/translations/lyricSentenceModel";
import NotFoundError from "../../exceptions/notFoundError";
import Locale from "../../locale/locale";

export default class LyricSentenceRepository {
    async getLyricSentence(id: number): Promise<LyricSentenceModel> {
        const lyricSentence = await LyricSentenceModel.findByPk(id);

        if (lyricSentence === null)
            throw new NotFoundError(
                Locale.createNotFoundErrorText("LyricSentence")
            );

        return lyricSentence;
    }
}
