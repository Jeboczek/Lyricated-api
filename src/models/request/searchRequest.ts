import SortingMode from "../enums/sortingMode";

export default interface SearchRequest {
    search_phrase: string;
    from_lang_id: string;
    to_lang_id: string;
    filter_options: SearchRequestFilterOptions;
    sorting_mode: SortingMode;
    dont_use_cache: boolean;
}

export interface SearchRequestFilterOptions {
    hide_curses?: boolean;
    hide_movies?: boolean;
    hide_series?: boolean;
    only_movie_id?: number;
}
