import SearchRepositoryResult from "./searchRepositoryResult";
import SearchRequest from "../../../models/request/searchRequest";

export default interface SearchRepositoryState {
    request: SearchRequest;
    translations: string[];
    mains: SearchRepositoryResult[];
    similar: SearchRepositoryResult[];
}
