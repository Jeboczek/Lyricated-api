import SearchServiceResult from "./searchServiceResult";
import SearchRequest from "../../../models/request/searchRequest";
import HandlerTimeResponse from "../../../models/response/handlerTimeResponse";

export default interface SearchServiceState {
    request: SearchRequest;
    translations: string[];
    mains: SearchServiceResult[];
    similar: SearchServiceResult[];
    handlersTime: HandlerTimeResponse[];
}
