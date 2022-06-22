import { Request } from "express";
import ErrorModelFactory from "../../../models/database/error/factory/errorModelFactory";

export default function createErrorModelFactory(
    req: Request,
    err: Error
): ErrorModelFactory {
    return new ErrorModelFactory({
        params: JSON.stringify(req.params),
        path: req.path,
        name: err.constructor.name,
        content: err.stack ?? "",
        message: err.message,
        statusCode: 500,
    });
}
