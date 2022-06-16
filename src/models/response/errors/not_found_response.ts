import Error_response from "./error_response";

export default class Not_found_response extends Error_response {
    constructor(message: string) {
        super(message);
    }
}
