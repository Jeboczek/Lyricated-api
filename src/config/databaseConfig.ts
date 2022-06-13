export interface DatabaseConfigOptions {
    user: string;
    password: string;
    name: string;
    host: string;
    driver: string;
    storage: string;
}

export default class DatabaseConfig {
    public user: string;
    public password: string;
    public host: string;
    public driver: string;
    public name: string;
    public storage: string;

    _databaseConfigOptionsFromEnv(): DatabaseConfigOptions {
        return {
            user: process.env.DB_USER ?? "",
            password: process.env.DB_PASS ?? "",
            driver: process.env.DB_DRIVER ?? "",
            name: process.env.DB_NAME ?? "",
            host: process.env.DB_HOST ?? "",
            storage: process.env.DB_STORAGE ?? "",
        };
    }

    constructor(config?: DatabaseConfigOptions) {
        // Get data from config or if not available from env
        const { user, password, host, driver, name, storage } =
            config ?? this._databaseConfigOptionsFromEnv();

        this.user = user; // root
        this.password = password; // f$a#21F5S
        this.host = host; // localhost
        this.driver = driver; // mariadb / sqlite etc.
        this.name = name; // database_name
        this.storage = storage; // ./database.db
    }
}
