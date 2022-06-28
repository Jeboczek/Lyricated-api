import LyricModel from "../../models/database/api/lyricModel";
import LyricSentenceModel from "../../models/database/api/translations/lyricSentenceModel";
import MovieModel from "../../models/database/api/movieModel";
import { Op } from "sequelize";
import DatabaseService from "../../services/databaseService/databaseService";
import PutLyricRequest from "../../models/request/putLyricRequest";
import UpdateError from "../../exceptions/updateError";
import MovieNameModel from "../../models/database/api/translations/movieNameModel";
import EpisodeModel from "../../models/database/api/episodeModel";
import Locale from "../../locale/locale";
import NotFoundError from "../../exceptions/notFoundError";

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

    async getLyricById(id: number): Promise<LyricModel> {
        const lyricModel = await LyricModel.findOne({
            where: { id },
            include: this.modelsToIncludeWithLyricModel,
        });

        if (lyricModel == null)
            throw new NotFoundError(Locale.createNotFoundErrorText("Lyric"));
        return lyricModel;
    }

    async getRandomLyric(
        options: LyricRepositoryQualityOptions
    ): Promise<LyricModel> {
        const qualityMustBe = this._createSearchSettingsForQuality(options);
        const db = DatabaseService.getInstance();

        const lyric = await LyricModel.findOne({
            order: db.sequelize.random(),
            where: { quality: qualityMustBe },
            include: this.modelsToIncludeWithLyricModel,
        });
        if (lyric === null)
            throw new NotFoundError(Locale.createThereIsNoObjectText("Lyric"));
        return lyric;
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

    async getLyricWithoutQuality(): Promise<LyricModel | null> {
        const lyric = await LyricModel.findOne({
            include: this.modelsToIncludeWithLyricModel,
            where: { quality: null },
        });
        if (lyric === null)
            throw new NotFoundError(Locale.createThereIsNoObjectText("Lyric"));
        return lyric;
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
            throw new UpdateError(Locale.createNotFoundErrorText("Movie"));

        const { minute, quality } = newData;

        try {
            return lyric.update({
                minute,
                quality,
            });
        } catch (e) {
            throw new UpdateError(Locale.createUpdateErrorText("Lyric"));
        }
    }
}
