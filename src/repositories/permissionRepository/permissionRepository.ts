import * as randomstring from "randomstring";
import KeyModel from "../../models/database/security/keyModel";
import CreateError from "../../exceptions/createError";
import Locale from "../../locale/locale";

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
}
