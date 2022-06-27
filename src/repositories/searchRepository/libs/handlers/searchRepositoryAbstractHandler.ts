import SearchRepositoryState from "../../interfaces/searchRepositoryState";

export default abstract class SearchRepositoryAbstractHandler {
    private nextHandler: SearchRepositoryAbstractHandler;

    public setNext(
        handler: SearchRepositoryAbstractHandler
    ): SearchRepositoryAbstractHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async handle(
        state: SearchRepositoryState
    ): Promise<SearchRepositoryState> {
        if (this.nextHandler) {
            return await this.nextHandler.handle(state);
        }

        return state;
    }
}
