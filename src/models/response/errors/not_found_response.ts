import ErrorResponse from "./error_response";

export default class NotFoundResponse extends ErrorResponse {
    constructor(message: string) {
        super(message);
    }
}
