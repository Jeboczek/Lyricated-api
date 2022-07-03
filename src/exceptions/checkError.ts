export default class CheckError extends Error {
    constructor(message?: string) {
        super(message);
    }
}
