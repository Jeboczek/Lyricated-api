export default class CacheService {
    private static instance: CacheService;

    static getInstance() {
        if (!CacheService.instance) {
            CacheService.instance = new CacheService();
        }
        return CacheService.instance;
    }
}
