import { Controller, Get, Response, Route, Security, Tags } from "tsoa";
import ErrorResponse from "../../models/response/errors/errorResponse";
import PermissionService from "../../services/permissionService/permissionService";
import PermissionResponse from "../../models/response/permissionResponse";

@Route("security")
@Tags("Security")
export class PermissionController extends Controller {
    private service: PermissionService;

    constructor(service?: PermissionService) {
        super();
        this.service = service ?? PermissionService.getInstance();
    }

    @Get("permissions")
    @Security("api_key", ["admin"])
    @Response<{ permissions: PermissionResponse[] }>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async getPermissions() {
        const permissions = await this.service.getAllPermissions();

        return {
            permissions: permissions.map((e) =>
                PermissionResponse.fromModel(e)
            ),
        };
    }
}
