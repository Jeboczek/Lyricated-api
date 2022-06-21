import LyricModel from "../models/database/api/lyricModel";
import LyricSentenceModel from "../models/database/api/translations/lyricSentenceModel";
import MovieModel from "../models/database/api/movieModel";
import LangModel from "../models/database/api/langModel";

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
}
