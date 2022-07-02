export default class CacheService {
    private static instance: CacheService;

    static getInstance() {
        if (!CacheService.instance) {
            CacheService.instance = new CacheService();
        }
        return CacheService.instance;
    }

    static get isCacheEnabled() {
        const cache = (process.env.ENABLE_CACHE ?? "").toLowerCase();
        return cache === "true" || cache === "yes" || cache === "1";
    }
}
