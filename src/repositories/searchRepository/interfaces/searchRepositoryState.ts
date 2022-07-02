import SearchRepositoryResult from "./searchRepositoryResult";
import SearchRequest from "../../../models/request/searchRequest";
import HandlerTimeResponse from "../../../models/response/handlerTimeResponse";

export default interface SearchRepositoryState {
    request: SearchRequest;
    translations: string[];
    mains: SearchRepositoryResult[];
    similar: SearchRepositoryResult[];
    handlersTime: HandlerTimeResponse[];
}
