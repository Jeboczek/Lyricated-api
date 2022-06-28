import ErrorModel from "../../database/error/errorModel";

export default class ErrorResponse {
    public name: string;
    public message: string;
    public errorUUID?: string;

    static fromErrorModel(errorModel: ErrorModel) {
        const resp = new ErrorResponse();

        const { name, uuid, message } = errorModel;

        resp.name = name;
        resp.message = message;
        resp.errorUUID = uuid;

        return resp;
    }
}
