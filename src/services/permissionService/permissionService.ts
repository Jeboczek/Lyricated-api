import PermissionRepository from "../../repositories/permissionRepository/permissionRepository";
import KeyModel from "../../models/database/security/keyModel";
import PermissionModel from "../../models/database/security/permissionModel";

export default class PermissionService {
    private static instance: PermissionService;
    private repo: PermissionRepository;

    private constructor(repo: PermissionRepository) {
        this.repo = repo;
    }

    static getInstance(repo?: PermissionRepository) {
        if (!PermissionService.instance) {
            if (repo === undefined)
                throw Error(
                    "When you first initialize PermissionService you need to provide a PermissionRepository."
                );
            PermissionService.instance = new PermissionService(repo);
        }
        return PermissionService.instance;
    }

    async getAllPermissions(): Promise<PermissionModel[]> {
        return this.repo.getAllPermissions();
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
