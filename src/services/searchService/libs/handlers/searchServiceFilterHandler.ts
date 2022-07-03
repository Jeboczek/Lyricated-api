import SearchServiceAbstractHandler from "./searchServiceAbstractHandler";
import SearchServiceState from "../../interfaces/searchServiceState";
import SearchServiceResult from "../../interfaces/searchServiceResult";
import CurseRepository from "../../../curseRepository/curseRepository";

export default class SearchServiceFilterHandler extends SearchServiceAbstractHandler {
    handlerName = "filter";

    private async _hideCurses(
        result: SearchServiceResult[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        hideCurses?: boolean
    ): Promise<SearchServiceResult[]> {
        if (hideCurses) {
            const repo = new CurseRepository();
            const curses = await repo.getCurses();
            return result.filter((e) => {
                const lyric = e.lyricModel;

                let haveCurse = false;

                // TODO: Curses should be filtered
                for (const curse of curses) {
                    for (const lyricSentence of lyric.sentences) {
                        haveCurse = lyricSentence.content
                            .toLowerCase()
                            .includes(curse.content);
                        if (haveCurse) return false;
                    }
                }
                return true;
            });
        }

        return result;
    }

    private _hideMovies(
        result: SearchServiceResult[],
        hideMovies?: boolean
    ): SearchServiceResult[] {
        if (hideMovies)
            return result.filter((e) => e.lyricModel.episodeId !== null);
        return result;
    }

    private _hideSeries(
        result: SearchServiceResult[],
        hideSeries?: boolean
    ): SearchServiceResult[] {
        if (hideSeries)
            return result.filter((e) => e.lyricModel.episodeId === null);
        return result;
    }

    private _onlyMovieId(result: SearchServiceResult[], movieId?: number) {
        if (movieId)
            return result.filter((e) => e.lyricModel.movieId === movieId);
        return result;
    }

    public async handle(
        state: SearchServiceState
    ): Promise<SearchServiceState> {
        this._beforeHandle();
        const {
            only_movie_id: onlyMovieId,
            hide_curses: hideCurses,
            hide_movies: hideMovies,
            hide_series: hideSeries,
        } = state.request.filter_options;

        // eslint-disable-next-line prefer-const
        for (let [i, result] of [state.mains, state.similar].entries()) {
            result = this._onlyMovieId(result, onlyMovieId);
            result = this._hideMovies(result, hideMovies);
            result = this._hideSeries(result, hideSeries);
            result = await this._hideCurses(result, hideCurses);
            if (i === 0) state.mains = result;
            state.similar = result;
        }

        this._afterHandle(state);
        return await super.handle(state);
    }
}
