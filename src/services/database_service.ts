import Database_config from "../config/database_config";
import { Sequelize } from "sequelize-typescript";
// Models
import Lang_model from "../models/database/lang_model";
import Movie_model from "../models/database/movie_model";
import Movie_name_model from "../models/database/translations/movie_name_model";
import { SyncOptions } from "sequelize";
import Episode_model from "../models/database/episode_model";
import Lyric_model from "../models/database/lyric_model";
import Lyric_sentence_model from "../models/database/translations/lyric_sentence_model";

export default class Database_service {
    private static instance: Database_service;
    private databaseConfig: Database_config;
    public sequelize: Sequelize;

    private constructor(databaseConfig: Database_config) {
        this.databaseConfig = databaseConfig;

        const { user, password, host, dialect, name, storage } = databaseConfig;

        this.sequelize = new Sequelize({
            models: [
                Lang_model,
                Lyric_model,
                Lyric_sentence_model,
                Movie_model,
                Movie_name_model,
                Episode_model,
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

    public static getInstance(databaseConfig: Database_config) {
        if (!Database_service.instance) {
            this.instance = new Database_service(databaseConfig);
        }

        return this.instance;
    }

    public async sync(options?: SyncOptions) {
        await this.sequelize.sync(options);
    }
}
