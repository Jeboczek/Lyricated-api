import SearchRepositoryState from "../../interfaces/searchRepositoryState";

export default abstract class AbstractHandler {
    private nextHandler: AbstractHandler;

    public setNext(handler: AbstractHandler): AbstractHandler {
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
