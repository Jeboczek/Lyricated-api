import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Put,
    Response,
    Route,
    Security,
    Tags,
} from "tsoa";
import ErrorResponse from "../../models/response/errors/errorResponse";
import PermissionResponse from "../../models/response/permissionResponse";
import KeyResponse from "../../models/response/keyResponse";
import PostKeyRequest from "../../models/request/postKeyRequest";
import SecurityRepository from "../../repositories/securityRepository/securityRepository";

@Route("security")
@Tags("Security")
export class SecurityController extends Controller {
    private repo: SecurityRepository;

    constructor(repo?: SecurityRepository) {
        super();
        this.repo = repo ?? new SecurityRepository();
    }

    @Get("permissions")
    @Security("api_key", ["admin"])
    @Response<{ permissions: PermissionResponse[] }>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async getPermissions() {
        const permissions = await this.repo.getAllPermissions();

        return {
            permissions: permissions.map((e) =>
                PermissionResponse.fromModel(e)
            ),
        };
    }

    @Get("/key/{key}")
    @Security("api_key", ["admin"])
    @Response<KeyResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async getKey(@Path("key") key: string) {
        const keyModel = await this.repo.getKey(key);

        return KeyResponse.fromModel(keyModel);
    }

    @Delete("/key/{key}")
    @Security("api_key", ["admin"])
    @Response<KeyResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async deleteKey(@Path("key") key: string) {
        const keyModel = await this.repo.deleteKey(key);

        return KeyResponse.fromModel(keyModel);
    }

    @Post("/key/new")
    @Security("api_key", ["admin"])
    @Response<KeyResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async newKey(@Body() request: PostKeyRequest) {
        const { name } = request;
        const keyModel = await this.repo.createNewKey(name);

        return KeyResponse.fromModel(keyModel);
    }

    @Put("key/{key}/permission/{permission}")
    @Security("api_key", ["admin"])
    @Response<PermissionResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async setPermission(
        @Path("key") key: string,
        @Path("permission") permission: string
    ) {
        await this.repo.assignPermissionToKey(key, permission);
        const permissionModel = await this.repo.getPermission(permission);

        return PermissionResponse.fromModel(permissionModel);
    }

    @Delete("key/{key}/permission/{permission}")
    @Security("api_key", ["admin"])
    @Response<PermissionResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async unsetPermission(
        @Path("key") key: string,
        @Path("permission") permission: string
    ) {
        await this.repo.deletePermissionFromKey(key, permission);
        const permissionModel = await this.repo.getPermission(permission);

        return PermissionResponse.fromModel(permissionModel);
    }
}
