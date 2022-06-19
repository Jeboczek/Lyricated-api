export default interface ErrorModelFactoryOptions {
    params?: string;
    stack?: string;
    path?: string;
    exceptionName: string;
    message: string;
    statusCode: number;
}
