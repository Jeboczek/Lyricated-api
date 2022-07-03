import KeyModel from "../database/security/keyModel";
import PermissionResponse from "./permissionResponse";

export default class KeyResponse {
    key: string;
    name: string;
    permissions: PermissionResponse[];

    static fromModel(e: KeyModel) {
        const resp = new KeyResponse();

        resp.key = e.key;
        resp.name = e.name;

        resp.permissions = [];
        if (e.permissions)
            resp.permissions = e.permissions.map((e) =>
                PermissionResponse.fromModel(e)
            );

        return resp;
    }
}
