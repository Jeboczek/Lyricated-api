import SearchRepositoryState from "../../interfaces/searchRepositoryState";
import SearchRepositoryAbstractHandler from "./searchRepositoryAbstractHandler";
import SortingMode from "../../../../models/enums/sortingMode";
import SearchRepositorySorter from "../sorters/searchRepositorySorter";
import SearchRepositoryLongestSorter from "../sorters/searchRepositoryLongestSorter";
import SearchRepositoryShortestSorter from "../sorters/searchRepositoryShortestSorter";
import SearchRepositoryBestMatchSorter from "../sorters/searchRepositoryBestMatchSorter";

export default class SearchRepositorySortHandler extends SearchRepositoryAbstractHandler {
    handlerName = "sort";

    public async handle(state: SearchRepositoryState) {
        this._beforeHandle();
        let sorter: SearchRepositorySorter;

        switch (state.request.sorting_mode) {
            case SortingMode.longest:
                sorter = new SearchRepositoryLongestSorter();
                break;
            case SortingMode.shortest:
                sorter = new SearchRepositoryShortestSorter();
                break;
            case SortingMode.bestMatch:
                sorter = new SearchRepositoryBestMatchSorter();
                break;
            default:
                return await super.handle(state);
        }

        state.mains = sorter.sort(state.mains);
        state.similar = sorter.sort(state.similar);
        this._afterHandle(state);
        return await super.handle(state);
    }
}
