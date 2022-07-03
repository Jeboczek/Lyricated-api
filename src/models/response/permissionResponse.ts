import PermissionModel from "../database/security/permissionModel";

export default class PermissionResponse {
    name: string;
    description: string;

    static fromModel(model: PermissionModel): PermissionResponse {
        const resp = new PermissionResponse();

        resp.name = model.name;
        resp.description = model.description;

        return resp;
    }
}
