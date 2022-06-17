import ErrorResponse, { ErrorResponseOptions } from "./errorResponse";

export default class ValidateErrorResponse extends ErrorResponse {
    constructor(options: ErrorResponseOptions) {
        super("Validate Error", options);
    }
}
