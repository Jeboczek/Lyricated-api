import SearchServiceResult from "./searchServiceResult";

export default interface SearchServiceReturn {
    mains: SearchServiceResult[];
    similar: SearchServiceResult[];
}
