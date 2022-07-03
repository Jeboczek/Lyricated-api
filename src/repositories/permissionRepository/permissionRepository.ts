import * as randomstring from "randomstring";
import KeyModel from "../../models/database/security/keyModel";
import CreateError from "../../exceptions/createError";
import Locale from "../../locale/locale";
import PermissionModel from "../../models/database/security/permissionModel";
import UpdateError from "../../exceptions/updateError";
import KeyToPermissionModel from "../../models/database/security/relationships/keyToPermissionModel";
import NotFoundError from "../../exceptions/notFoundError";
import DeleteError from "../../exceptions/deleteError";

export default class PermissionRepository {
    async createNewKey(name: string, length = 64): Promise<KeyModel> {
        const key = randomstring.generate(length);
        try {
            return await KeyModel.create({
                key,
                name,
            });
        } catch (e) {
            throw new CreateError(Locale.createCreateErrorText("Key"));
        }
    }

    async addPermissionIfNotExists(
        name: string,
        description: string
    ): Promise<PermissionModel | undefined> {
        const permissionExists =
            (await PermissionModel.findOne({
                where: {
                    name,
                },
            })) !== null;

        if (permissionExists) return;

        try {
            return await PermissionModel.create({
                name,
                description,
            });
        } catch (e) {
            throw new CreateError(Locale.createCreateErrorText("Permission"));
        }
    }

    async assignPermissionToKey(
        permissionName: string,
        key: string
    ): Promise<KeyToPermissionModel> {
        // Check if Permission and Key exists
        const permissionModel = await PermissionModel.findOne({
            where: {
                name: permissionName,
            },
        });
        if (permissionModel === null)
            throw new UpdateError(
                Locale.createThereIsNoObjectText("Permission")
            );
        const keyModel = await KeyModel.findOne({
            where: { key },
        });
        if (keyModel === null)
            throw new UpdateError(Locale.createThereIsNoObjectText("Key"));

        // Create new KeyToPermissionModel
        try {
            return await KeyToPermissionModel.create({
                keyId: keyModel.id,
                permissionId: permissionModel.id,
            });
        } catch (e) {
            throw new UpdateError(
                Locale.createCreateErrorText("KeyToPermission")
            );
        }
    }

    async checkIfKeyHavePermission(
        key: string,
        permissionName: string
    ): Promise<boolean> {
        const keyModel = await this.getKey(key);

        return (
            keyModel.permissions.find((e) => e.name === permissionName) !==
            undefined
        );
    }

    async getAllPermissions(): Promise<PermissionModel[]> {
        return await PermissionModel.findAll();
    }

    async thereIsSomeKeyInTheDatabase(): Promise<boolean> {
        const numberOfKeys = await KeyModel.count();
        return numberOfKeys !== 0;
    }

    async getKey(key: string): Promise<KeyModel> {
        const keyModel = await KeyModel.findOne({
            where: { key },
            include: [PermissionModel],
        });

        if (keyModel === null)
            throw new NotFoundError(Locale.createNotFoundErrorText("Key"));

        return keyModel;
    }

    async getPermission(permission: string): Promise<PermissionModel> {
        const permissionModel = await PermissionModel.findOne({
            where: { name: permission },
        });

        if (permissionModel === null)
            throw new NotFoundError(
                Locale.createNotFoundErrorText("Permission")
            );

        return permissionModel;
    }

    async deletePermissionFromKey(
        key: string,
        permission: string
    ): Promise<void> {
        const keyModel = await this.getKey(key);

        try {
            keyModel.permissions = keyModel.permissions.filter(
                (e) => e.name !== permission
            );
            await keyModel.save();
        } catch (e) {
            throw new UpdateError(Locale.createUpdateErrorText("Key"));
        }
    }

    async deleteKey(key: string): Promise<KeyModel> {
        const keyModel = await this.getKey(key);

        try {
            await keyModel.destroy();
            return keyModel;
        } catch (e) {
            throw new DeleteError(Locale.createDeleteErrorText("Key"));
        }
    }
}
