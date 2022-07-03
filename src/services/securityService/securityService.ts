import KeyModel from "../../models/database/security/keyModel";
import SecurityRepository from "../../repositories/securityRepository/securityRepository";

export default class SecurityService {
    private static instance: SecurityService;
    private repo: SecurityRepository;

    private constructor(repo: SecurityRepository) {
        this.repo = repo;
    }

    static getInstance(repo?: SecurityRepository) {
        if (!SecurityService.instance) {
            if (repo === undefined)
                throw Error(
                    "When you first initialize PermissionService you need to provide a PermissionRepository."
                );
            SecurityService.instance = new SecurityService(repo);
        }
        return SecurityService.instance;
    }

    async addAllDefaultPermissions() {
        await this.repo.addPermissionIfNotExists(
            "contributor",
            "It allows you to modify (Create, Update, Delete) the content of the application. E.g. Movies, Languages etc."
        );
        await this.repo.addPermissionIfNotExists(
            "admin",
            "It allows you to add new keys and permissions. It also allows you to assign permissions keys."
        );
        await this.repo.addPermissionIfNotExists(
            "client",
            "It allows you to access application data. This permission should be the only one for the end user."
        );
    }

    async createNewKey(name: string, permissions: string[]): Promise<KeyModel> {
        const key = await this.repo.createNewKey(name);
        for (const permission of permissions) {
            await this.repo.assignPermissionToKey(permission, key.key);
        }
        return key;
    }

    async createAdminKeyIfThereIsNoKeys(): Promise<KeyModel | undefined> {
        if (!(await this.repo.thereIsSomeKeyInTheDatabase())) {
            return await this.createNewKey("Super Admin", [
                "admin",
                "client",
                "contributor",
            ]);
        }
    }

    async checkIfKeyHavePermission(
        key: string,
        permission: string
    ): Promise<boolean> {
        return await this.repo.checkIfKeyHavePermission(key, permission);
    }
}
