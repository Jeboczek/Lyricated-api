import AbstractHandler from "./abstractHandler";
import SearchRepositoryState from "../../interfaces/searchRepositoryState";
import SearchRepositoryResult from "../../interfaces/searchRepositoryResult";

export default class FilterHandler extends AbstractHandler {
    private _hideCurses(
        result: SearchRepositoryResult[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        hideCurses?: boolean
    ): SearchRepositoryResult[] {
        //  TODO: Implement
        return result;
    }

    private _hideMovies(
        result: SearchRepositoryResult[],
        hideMovies?: boolean
    ): SearchRepositoryResult[] {
        if (hideMovies)
            return result.filter((e) => e.lyricModel.episodeId !== null);
        return result;
    }

    private _hideSeries(
        result: SearchRepositoryResult[],
        hideSeries?: boolean
    ): SearchRepositoryResult[] {
        if (hideSeries)
            return result.filter((e) => e.lyricModel.episodeId === null);
        return result;
    }

    private _onlyMovieId(result: SearchRepositoryResult[], movieId?: number) {
        if (movieId)
            return result.filter((e) => e.lyricModel.movieId === movieId);
        return result;
    }

    public async handle(
        state: SearchRepositoryState
    ): Promise<SearchRepositoryState> {
        const {
            only_movie_id: onlyMovieId,
            hide_curses: hideCurses,
            hide_movies: hideMovies,
            hide_series: hideSeries,
        } = state.request.filter_options;

        for (let result of [state.mains, state.similar]) {
            result = this._onlyMovieId(result, onlyMovieId);
            result = this._hideMovies(result, hideMovies);
            result = this._hideSeries(result, hideSeries);
            result = this._hideCurses(result, hideCurses);
        }

        return await super.handle(state);
    }
}
