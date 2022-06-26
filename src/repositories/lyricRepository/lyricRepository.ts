import LyricModel from "../../models/database/api/lyricModel";
import LyricSentenceModel from "../../models/database/api/translations/lyricSentenceModel";
import MovieModel from "../../models/database/api/movieModel";
import { Op } from "sequelize";
import DatabaseService from "../../services/databaseService/databaseService";
import PutLyricRequest from "../../models/request/putLyricRequest";
import UpdateError from "../../exceptions/updateError";
import MovieNameModel from "../../models/database/api/translations/movieNameModel";
import EpisodeModel from "../../models/database/api/episodeModel";

export interface LyricRepositoryQualityOptions {
    qualityBetterThan?: number;
    qualityLowerThan?: number;
    qualityEqual?: number;
}

export default class LyricRepository {
    private readonly modelsToIncludeWithLyricModel = [
        LyricSentenceModel,
        {
            model: MovieModel,
            include: [MovieNameModel, EpisodeModel],
        },
    ];

    _createSearchSettingsForQuality(
        options: LyricRepositoryQualityOptions
    ): { [key: symbol]: number } | undefined {
        const { qualityBetterThan, qualityLowerThan, qualityEqual } = options;

        const qualityMustBe: { [key: symbol]: number } = {};

        if (qualityLowerThan != null) qualityMustBe[Op.lt] = qualityLowerThan;
        if (qualityBetterThan != null) qualityMustBe[Op.gt] = qualityBetterThan;
        if (qualityEqual != null) qualityMustBe[Op.eq] = qualityEqual;

        return qualityMustBe;
    }

    getLyricById(id: number): Promise<LyricModel | null> {
        return LyricModel.findOne({
            where: { id },
            include: this.modelsToIncludeWithLyricModel,
        });
    }

    getRandomLyric(
        options: LyricRepositoryQualityOptions
    ): Promise<LyricModel | null> {
        const qualityMustBe = this._createSearchSettingsForQuality(options);
        const db = DatabaseService.getInstance();

        return LyricModel.findOne({
            order: db.sequelize.random(),
            where: { quality: qualityMustBe },
            include: this.modelsToIncludeWithLyricModel,
        });
    }

    getLyricsByQuality(
        limit = 100,
        options: LyricRepositoryQualityOptions
    ): Promise<LyricModel[]> {
        const qualityMustBe = this._createSearchSettingsForQuality(options);
        return LyricModel.findAll({
            where: { quality: qualityMustBe },
            include: this.modelsToIncludeWithLyricModel,
            limit,
        });
    }

    getLyricWithoutQuality(): Promise<LyricModel | null> {
        return LyricModel.findOne({
            include: this.modelsToIncludeWithLyricModel,
            where: { quality: null },
        });
    }

    async updateLyric(
        id: number,
        newData: PutLyricRequest
    ): Promise<LyricModel> {
        const lyric = await LyricModel.findOne({
            include: this.modelsToIncludeWithLyricModel,
            where: { id },
        });

        if (lyric === null)
            throw new UpdateError("Unable to find a movie with the given id");

        const { minute, quality } = newData;

        return lyric.update({
            minute,
            quality,
        });
    }
}
