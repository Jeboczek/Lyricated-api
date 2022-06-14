import DatabaseConfig from "../config/databaseConfig";
import { Sequelize } from "sequelize-typescript";
// Models
import LangModel from "../models/lang.model";
import MovieModel from "../models/movie.model";
import MovieTranslationModel from "../models/translations/movieTranslation.model";
import { SyncOptions } from "sequelize";

export default class DatabaseService {
    private static instance: DatabaseService;
    private databaseConfig: DatabaseConfig;
    public sequelize: Sequelize;

    private constructor(databaseConfig: DatabaseConfig) {
        this.databaseConfig = databaseConfig;

        const { user, password, host, dialect, name, storage } = databaseConfig;

        this.sequelize = new Sequelize({
            models: [LangModel, MovieModel, MovieTranslationModel],
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
