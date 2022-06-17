import DatabaseConfig from "../config/database_config";
import { Sequelize } from "sequelize-typescript";
// Models
import LangModel from "../models/database/lang_model";
import MovieModel from "../models/database/movie_model";
import MovieNameModel from "../models/database/translations/movie_name_model";
import { SyncOptions } from "sequelize";
import EpisodeModel from "../models/database/episode_model";
import LyricModel from "../models/database/lyric_model";
import LyricSentenceModel from "../models/database/translations/lyric_sentence_model";
import { singleton } from "tsyringe";

@singleton()
export default class DatabaseService {
    public sequelize: Sequelize;

    constructor(private databaseConfig: DatabaseConfig) {
        const { user, password, host, dialect, name, storage } =
            this.databaseConfig;

        this.sequelize = new Sequelize({
            models: [
                LangModel,
                LyricModel,
                LyricSentenceModel,
                MovieModel,
                MovieNameModel,
                EpisodeModel,
            ],
            define: { timestamps: false },
            logging: true,
            storage: storage,
            host: host,
            username: user,
            password: password,
            database: name,
            dialect: dialect,
        });
    }

    public async sync(options?: SyncOptions) {
        await this.sequelize.sync(options);
    }
}
