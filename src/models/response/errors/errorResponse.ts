import ErrorModel from "../../database/error/errorModel";

export default class ErrorResponse {
    public message: string;
    public errorUUID: string;

    constructor(errorModel: ErrorModel) {
        this.message = errorModel.message;
        this.errorUUID = errorModel.uuid;
    }
}
