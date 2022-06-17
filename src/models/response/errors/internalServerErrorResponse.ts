import ErrorResponse, { ErrorResponseOptions } from "./errorResponse";

export default class InternalServerErrorResponse extends ErrorResponse {
    constructor(options: ErrorResponseOptions) {
        super("Internal Server Error", options);
    }
}
