import SearchServiceState from "../../interfaces/searchServiceState";
import SearchServiceAbstractHandler from "./searchServiceAbstractHandler";
import SortingMode from "../../../../models/enums/sortingMode";
import SearchServiceSorter from "../sorters/searchServiceSorter";
import SearchServiceLongestSorter from "../sorters/searchServiceLongestSorter";
import SearchServiceShortestSorter from "../sorters/searchServiceShortestSorter";
import SearchServiceBestMatchSorter from "../sorters/searchServiceBestMatchSorter";

export default class SearchServiceSortHandler extends SearchServiceAbstractHandler {
    handlerName = "sort";

    public async handle(state: SearchServiceState) {
        this._beforeHandle();
        let sorter: SearchServiceSorter;

        switch (state.request.sorting_mode) {
            case SortingMode.longest:
                sorter = new SearchServiceLongestSorter();
                break;
            case SortingMode.shortest:
                sorter = new SearchServiceShortestSorter();
                break;
            case SortingMode.bestMatch:
                sorter = new SearchServiceBestMatchSorter();
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
