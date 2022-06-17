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

export default class DatabaseService {
    private static instance: DatabaseService;
    private databaseConfig: DatabaseConfig;
    public sequelize: Sequelize;

    private constructor(databaseConfig: DatabaseConfig) {
        this.databaseConfig = databaseConfig;

        const { user, password, host, dialect, name, storage } = databaseConfig;

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

    public static getInstance(databaseConfig: DatabaseConfig) {
        if (!DatabaseService.instance) {
            this.instance = new DatabaseService(databaseConfig);
        }

        return this.instance;
    }

    public async sync(options?: SyncOptions) {
        await this.sequelize.sync(options);
    }
}
