import SearchRepositoryState from "../../interfaces/searchRepositoryState";
import SearchRepositoryAbstractHandler from "./searchRepositoryAbstractHandler";
import SortingMode from "../../../../models/enums/sortingMode";
import SearchRepositorySorter from "../sorters/searchRepositorySorter";
import SearchRepositoryLongestSorter from "../sorters/searchRepositoryLongestSorter";
import SearchRepositoryShortestSorter from "../sorters/searchRepositoryShortestSorter";
import SearchRepositoryBestMatchSorter from "../sorters/searchRepositoryBestMatchSorter";

export default class SearchRepositorySortHandler extends SearchRepositoryAbstractHandler {
    public async handle(state: SearchRepositoryState) {
        let sorter: SearchRepositorySorter;

        console.log(state.request.sorting_mode);

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
        return await super.handle(state);
    }
}
