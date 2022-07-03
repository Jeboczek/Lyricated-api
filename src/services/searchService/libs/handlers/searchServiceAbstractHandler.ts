import SearchServiceState from "../../interfaces/searchServiceState";

export default abstract class SearchServiceAbstractHandler {
    private nextHandler: SearchServiceAbstractHandler;
    private startTime: DOMHighResTimeStamp;
    public abstract handlerName: string;

    public setNext(
        handler: SearchServiceAbstractHandler
    ): SearchServiceAbstractHandler {
        this.nextHandler = handler;
        return handler;
    }

    protected _beforeHandle() {
        this.startTime = performance.now();
    }

    protected _afterHandle(state: SearchServiceState) {
        const endTime = performance.now();
        const ms = Math.round((endTime - this.startTime) * 100) / 100;
        state.handlersTime.push({
            name: this.handlerName,
            time: `${ms}ms`,
        });
    }

    public async handle(
        state: SearchServiceState
    ): Promise<SearchServiceState> {
        if (this.nextHandler) {
            return await this.nextHandler.handle(state);
        }

        return state;
    }
}
