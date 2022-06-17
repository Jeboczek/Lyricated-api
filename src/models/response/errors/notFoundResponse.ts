import ErrorResponse, { ErrorResponseOptions } from "./errorResponse";

export default class NotFoundResponse extends ErrorResponse {
    constructor(options: ErrorResponseOptions, message?: string) {
        super(message ?? "Not Found", options);
    }
}
