import { NextFunction, Request, Response } from "express";
import { ValidateError } from "@tsoa/runtime";
import ValidateErrorResponse from "../models/response/errors/validateErrorResponse";
import InternalServerErrorResponse from "../models/response/errors/internalServerErrorResponse";
import ErrorResponse from "../models/response/errors/errorResponse";

async function sendErrorResponse(
    res: Response,
    err: ErrorResponse,
    statusCode: number
) {
    await err.save();
    return res.status(statusCode).send(err.toJson());
}

export default async function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    if (err instanceof ValidateError) {
        await sendErrorResponse(
            res,
            new ValidateErrorResponse({
                exceptionName: err.name,
                params: req.params.toString(),
                path: req.path,
                stack: err.stack,
            }),
            422
        );
    }
    if (err instanceof Error) {
        await sendErrorResponse(
            res,
            new InternalServerErrorResponse({
                exceptionName: err.name,
                params: req.params.toString(),
                path: req.path,
                stack: err.stack,
            }),
            500
        );
    }

    next();
}
