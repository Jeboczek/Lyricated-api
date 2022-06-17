import ErrorResponse from "./errorResponse";

export default class NotFoundResponse extends ErrorResponse {
    constructor(message: string) {
        super(message);
    }
}
