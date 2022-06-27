import SearchRepositoryState from "../../interfaces/searchRepositoryState";
import SearchRepositoryAbstractHandler from "./searchRepositoryAbstractHandler";

export default class SearchRepositorySortHandler extends SearchRepositoryAbstractHandler {
    public async handle(state: SearchRepositoryState) {
        return await super.handle(state);
    }
}
