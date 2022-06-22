import ErrorModel from "../../database/error/errorModel";

export default class ErrorResponse {
    public message: string;
    public errorUUID?: string;

    static fromErrorModel(errorModel: ErrorModel) {
        const resp = new ErrorResponse();

        resp.message = errorModel.message;
        resp.errorUUID = errorModel.uuid;

        return resp;
    }
}
