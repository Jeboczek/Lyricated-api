import { Request } from "express";
import ErrorModelFactory from "../../../models/database/error/factory/errorModelFactory";

export default function createErrorModelFactory(
    req: Request,
    err: Error
): ErrorModelFactory {
    return new ErrorModelFactory({
        exceptionName: err.constructor.name,
        message: err.message,
        params: JSON.stringify(req.params),
        path: req.path,
        stack: err.stack,
        statusCode: 500,
    });
}
