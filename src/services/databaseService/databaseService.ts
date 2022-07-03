import DatabaseConfig from "../../config/databaseConfig";
import { Sequelize } from "sequelize-typescript";
// Models
import LangModel from "../../models/database/api/langModel";
import MovieModel from "../../models/database/api/movieModel";
import MovieNameModel from "../../models/database/api/translations/movieNameModel";
import { SyncOptions } from "sequelize";
import EpisodeModel from "../../models/database/api/episodeModel";
import LyricModel from "../../models/database/api/lyricModel";
import LyricSentenceModel from "../../models/database/api/translations/lyricSentenceModel";
import ErrorModel from "../../models/database/error/errorModel";
import CurseModel from "../../models/database/api/curseModel";
import KeyModel from "../../models/database/security/keyModel";
import KeyToPermissionModel from "../../models/database/security/relationships/keyToPermissionModel";
import PermissionModel from "../../models/database/security/permissionModel";

export default class DatabaseService {
    private static instance: DatabaseService;
    private databaseConfig: DatabaseConfig;
    public sequelize: Sequelize;

    private constructor(databaseConfig: DatabaseConfig) {
        this.databaseConfig = databaseConfig;

        const { username, password, host, dialect, database, storage } =
            databaseConfig;

        this.sequelize = new Sequelize({
            models: [
                LangModel,
                LyricModel,
                LyricSentenceModel,
                MovieModel,
                MovieNameModel,
                EpisodeModel,
                ErrorModel,
                CurseModel,
                KeyModel,
                KeyToPermissionModel,
                PermissionModel,
            ],
            define: {
                timestamps: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
            logging: false,
            storage,
            host,
            username,
            password,
            database,
            dialect,
        });
    }

    public static getInstance(databaseConfig?: DatabaseConfig) {
        if (!DatabaseService.instance) {
            if (databaseConfig == null)
                throw Error(
                    "When you first initialize DatabaseService you need to provide a config."
                );
            this.instance = new DatabaseService(databaseConfig);
        }

        return this.instance;
    }

    public async sync(options?: SyncOptions) {
        await this.sequelize.sync(options);
    }
}
