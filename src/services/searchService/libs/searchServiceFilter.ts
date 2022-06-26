import LyricModel from "../../../models/database/api/lyricModel";
import { SearchRequestFilterOptions } from "../../../models/request/searchRequest";

export default class SearchServiceFilter {
    private _hideCurses(
        lyrics: LyricModel[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        hideCurses?: boolean
    ): LyricModel[] {
        //  TODO: Implement
        return lyrics;
    }

    private _hideMovies(
        lyrics: LyricModel[],
        hideMovies?: boolean
    ): LyricModel[] {
        if (hideMovies) return lyrics.filter((e) => e.episodeId !== null);
        return lyrics;
    }

    private _hideSeries(
        lyrics: LyricModel[],
        hideSeries?: boolean
    ): LyricModel[] {
        if (hideSeries) return lyrics.filter((e) => e.episodeId === null);
        return lyrics;
    }

    private _onlyMovieId(lyrics: LyricModel[], movieId?: number) {
        if (movieId) return lyrics.filter((e) => e.movieId === movieId);
        return lyrics;
    }

    public filter(
        lyrics: LyricModel[],
        filterOptions: SearchRequestFilterOptions
    ): LyricModel[] {
        const {
            only_movie_id: onlyMovieId,
            hide_curses: hideCurses,
            hide_movies: hideMovies,
            hide_series: hideSeries,
        } = filterOptions;

        lyrics = this._onlyMovieId(lyrics, onlyMovieId);
        lyrics = this._hideMovies(lyrics, hideMovies);
        lyrics = this._hideSeries(lyrics, hideSeries);
        return this._hideCurses(lyrics, hideCurses);
    }
}
