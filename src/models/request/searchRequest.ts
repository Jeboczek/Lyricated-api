export default interface SearchRequest {
    search_phase: string;
    from_lang_id: string;
    to_lang_id: string;
    filter_options: SearchRequestFilterOptions;
}

export interface SearchRequestFilterOptions {
    hide_curses?: boolean;
    hide_movies?: boolean;
    hide_series?: boolean;
    only_movie_id?: number;
}
