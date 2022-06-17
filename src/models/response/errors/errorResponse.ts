import ErrorModel from "../../database/error/errorModel";

export interface ErrorResponseOptions {
    stack: string | undefined;
    exceptionName?: string;
    path: string;
    params: string;
}

export default class ErrorResponse {
    public message: string;
    public errorUUID: string;
    private errorModel: ErrorModel;
    private stack: string | undefined;
    private exceptionName?: string;
    private path: string;
    private params: string;

    constructor(message: string, options: ErrorResponseOptions) {
        this.message = message;

        const { stack, exceptionName, path, params } = options;

        this.stack = stack;
        this.exceptionName = exceptionName;
        this.params = params;
        this.path = path;

        this.errorModel = this._createErrorModel();
        this.errorUUID = this.errorModel.uuid;
    }

    _createErrorModel(): ErrorModel {
        const errorModel = new ErrorModel();

        errorModel.message = this.message;
        errorModel.stack = this.stack ?? "";
        errorModel.path = this.path;
        errorModel.exception = this.exceptionName ?? "None";
        errorModel.params = this.params;

        return errorModel;
    }

    save(): Promise<ErrorModel> {
        return this.errorModel.save();
    }

    toJson(): { [key: string]: string } {
        const { errorUUID, message } = this;

        return {
            errorUUID,
            message,
        };
    }
}
