import LyricModel from "../../../models/database/api/lyricModel";
import LyricSentenceModel from "../../../models/database/api/translations/lyricSentenceModel";
import { Op } from "sequelize";

export interface SearchServiceOptions {
    searchPhase: string;
    fromLang: string;
    toLang: string;
}

export default class SearchServiceSearch {
    async search(options: SearchServiceOptions) {
        const { fromLang, toLang } = options;

        // Get LyricModels with queried languages
        let lyrics = await LyricModel.findAll({
            include: {
                model: LyricSentenceModel,
                where: {
                    langId: {
                        [Op.in]: [fromLang, toLang],
                    },
                },
            },
            where: {},
        });

        //  Filter LyricModel's without 2 LyricSentence's
        lyrics = lyrics.filter((e) => e.sentences.length === 2);
    }
}
