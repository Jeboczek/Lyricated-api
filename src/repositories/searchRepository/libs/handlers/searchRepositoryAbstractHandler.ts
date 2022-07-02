import SearchRepositoryState from "../../interfaces/searchRepositoryState";

export default abstract class SearchRepositoryAbstractHandler {
    private nextHandler: SearchRepositoryAbstractHandler;
    private startTime: DOMHighResTimeStamp;
    public abstract handlerName: string;

    public setNext(
        handler: SearchRepositoryAbstractHandler
    ): SearchRepositoryAbstractHandler {
        this.nextHandler = handler;
        return handler;
    }

    protected _beforeHandle() {
        this.startTime = performance.now();
    }

    protected _afterHandle(state: SearchRepositoryState) {
        const endTime = performance.now();
        const ms = Math.round((endTime - this.startTime) * 100) / 100;
        state.handlersTime.push({
            name: this.handlerName,
            time: `${ms}ms`,
        });
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
