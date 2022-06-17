import DatabaseConfig from "../config/databaseConfig";
import { Sequelize } from "sequelize-typescript";
// Models
import LangModel from "../models/database/langModel";
import MovieModel from "../models/database/movieModel";
import MovieNameModel from "../models/database/translations/movieNameModel";
import { SyncOptions } from "sequelize";
import EpisodeModel from "../models/database/episodeModel";
import LyricModel from "../models/database/lyricModel";
import LyricSentenceModel from "../models/database/translations/lyricSentenceModel";

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
