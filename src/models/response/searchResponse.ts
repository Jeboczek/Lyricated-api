import SearchResultResponse from "./searchResultResponse";

export default class SearchResponse {
    from_lang_id: string;
    to_lang_id: string;
    search_phase: string;
    cached: boolean;
    translations: string[];
    main_results: SearchResultResponse[];
    similar_results: SearchResultResponse[];
}
