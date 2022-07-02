import { createClient, RedisClientType } from "redis";
import CacheConfig from "../../config/cacheConfig";
import md5 from "md5";

export default class CacheService {
    private static instance: CacheService;
    private client: RedisClientType;
    private config: CacheConfig;
    public prefix: string;

    constructor(config: CacheConfig) {
        this.config = config;
        this.client = createClient({
            url: config.connectionPath,
        });
        this.prefix = config.prefix;
    }

    static getInstance(config?: CacheConfig) {
        if (!CacheService.instance) {
            if (config == null)
                throw Error(
                    "When you first initialize CacheService you need to provide a config."
                );
            CacheService.instance = new CacheService(config);
        }
        return CacheService.instance;
    }

    static get isCacheEnabled() {
        const cache = (process.env.ENABLE_CACHE ?? "").toLowerCase();
        return cache === "true" || cache === "yes" || cache === "1";
    }

    requestToHash(request: { [key: string]: any }): string {
        let requestConceitedString = "";

        for (const key in request) {
            requestConceitedString += key.toString();
            requestConceitedString += request[key].toString();
        }

        return md5(requestConceitedString);
    }
}
