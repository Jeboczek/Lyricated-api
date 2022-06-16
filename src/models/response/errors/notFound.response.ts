import ErrorResponse from "./error.response";

export default class NotFoundResponse extends ErrorResponse {
    constructor(message: string) {
        super(message);
    }
}
