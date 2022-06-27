import SearchRepositoryResult from "./searchRepositoryResult";

export default interface SearchRepositoryReturn {
    mains: SearchRepositoryResult[];
    similar: SearchRepositoryResult[];
}
