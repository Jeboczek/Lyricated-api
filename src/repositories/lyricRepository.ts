import LyricModel from "../models/database/api/lyricModel";
import LyricSentenceModel from "../models/database/api/translations/lyricSentenceModel";
import MovieModel from "../models/database/api/movieModel";
import LangModel from "../models/database/api/langModel";
import { Op } from "sequelize";

export interface GetLyricByQualityOptions {
    qualityBetterThan?: number;
    qualityLowerThan?: number;
    qualityEqual?: number;
}

export default class LyricRepository {
    private readonly modelsToIncludeWithLyricModel = [
        LyricSentenceModel,
        MovieModel,
        LangModel,
    ];

    getLyricById(id: number): Promise<LyricModel | null> {
        return LyricModel.findOne({
            where: { id },
            include: this.modelsToIncludeWithLyricModel,
        });
    }

    getLyricsByQuality(
        limit: 100,
        options: GetLyricByQualityOptions
    ): Promise<LyricModel[]> {
        const { qualityBetterThan, qualityLowerThan, qualityEqual } = options;

        let qualityMustBe;

        if (qualityLowerThan != null)
            qualityMustBe = { [Op.lt]: qualityLowerThan };
        if (qualityBetterThan != null)
            qualityMustBe = { [Op.gt]: qualityBetterThan };
        if (qualityEqual != null) qualityMustBe = { [Op.eq]: qualityEqual };

        return LyricModel.findAll({
            where: { quality: qualityMustBe },
            include: this.modelsToIncludeWithLyricModel,
            limit,
        });
    }
}
