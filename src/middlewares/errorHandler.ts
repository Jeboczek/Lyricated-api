import { NextFunction, Request, Response } from "express";
import { ValidateError } from "@tsoa/runtime";
import ValidateErrorResponse from "../models/response/errors/validateErrorResponse";
import InternalServerErrorResponse from "../models/response/errors/internalServerErrorResponse";

export default function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): Response | void {
    if (err instanceof ValidateError) {
        return res
            .status(422)
            .json(new ValidateErrorResponse("Validate error"));
    }
    if (err instanceof Error) {
        return res
            .status(500)
            .json(new InternalServerErrorResponse("Internal Server Error"));
    }

    next();
}
