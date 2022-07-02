import { Dialect } from "sequelize/types";

export interface DatabaseConfigOptions {
    user: string;
    password: string;
    name: string;
    host: string;
    dialect: Dialect;
    storage: string;
}

export default class DatabaseConfig {
    public user: string;
    public password: string;
    public host: string;
    public dialect: Dialect;
    public name: string;
    public storage: string;

    constructor(config?: DatabaseConfigOptions) {
        // Get data from config or if not available from env
        const { user, password, host, dialect, name, storage } =
            config ?? this._databaseConfigOptionsFromEnv();

        this.user = user; // root
        this.password = password; // f$a#21F5S
        this.host = host; // localhost
        this.dialect = dialect; // mariadb / sqlite etc.
        this.name = name; // database_name
        this.storage = storage; // ./database.db
    }

    private _databaseConfigOptionsFromEnv(): DatabaseConfigOptions {
        const { DB_USER, DB_PASS, DB_DIALECT, DB_NAME, DB_HOST, DB_STORAGE } =
            process.env;
        return {
            user: DB_USER ?? "",
            password: DB_PASS ?? "",
            dialect: this._checkIfIsDialectType(DB_DIALECT)
                ? (DB_DIALECT as Dialect)
                : "sqlite",
            name: DB_NAME ?? "",
            host: DB_HOST ?? "",
            storage: DB_STORAGE ?? "",
        };
    }

    private _checkIfIsDialectType(x?: string): x is Dialect {
        if (x == null) {
            return false;
        } else {
            return [
                "mysql",
                "postgres",
                "sqlite",
                "mariadb",
                "mssql",
                "db2",
                "snowflake",
            ].includes(x);
        }
    }
}
