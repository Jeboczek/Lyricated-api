import * as randomstring from "randomstring";
import KeyModel from "../../models/database/security/keyModel";
import CreateError from "../../exceptions/createError";
import Locale from "../../locale/locale";
import PermissionModel from "../../models/database/security/permissionModel";
import UpdateError from "../../exceptions/updateError";
import KeyToPermissionModel from "../../models/database/security/relationships/keyToPermissionModel";

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
}
