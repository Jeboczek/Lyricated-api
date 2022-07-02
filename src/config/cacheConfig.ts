export interface CacheConfigOptions {
    connectionPath: string;
    prefix: string;
}

export default class CacheConfig {
    public connectionPath: string;
    public prefix: string;

    constructor(config?: CacheConfigOptions) {
        // Get data from config or if not available from env
        const { connectionPath, prefix } =
            config ?? this._databaseConfigOptionsFromEnv();

        this.connectionPath = connectionPath;
        this.prefix = prefix;
    }

    private _databaseConfigOptionsFromEnv(): CacheConfigOptions {
        const { CACHE_PREFIX, REDIS_CONNECTION_PATH } = process.env;
        return {
            connectionPath: REDIS_CONNECTION_PATH ?? "redis://localhost",
            prefix: CACHE_PREFIX ?? "lyricated",
        };
    }
}
