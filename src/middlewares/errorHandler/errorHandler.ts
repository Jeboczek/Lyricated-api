import { NextFunction, Request, Response } from "express";
import { ValidateError } from "@tsoa/runtime";
import createErrorModelFactory from "./functions/createErrorModelFactory";
import sendErrorModel from "./functions/sendErrorModel";
import NotFoundError from "../../exceptions/notFoundError";
import ErrorModel from "../../models/database/error/errorModel";
import DeleteError from "../../exceptions/deleteError";
import UpdateError from "../../exceptions/updateError";
import CreateError from "../../exceptions/createError";
import AuthenticationError from "../../exceptions/authenticationError";

export default async function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    if (err instanceof Error) {
        const errFactory = createErrorModelFactory(req, err);

        let errorModel: ErrorModel;

        if (err instanceof ValidateError)
            errorModel = errFactory.createValidationError(err.message);
        else if (err instanceof NotFoundError)
            errorModel = errFactory.createNotFoundError(err.message);
        else if (err instanceof DeleteError)
            errorModel = errFactory.createDeleteError(err.message);
        else if (err instanceof UpdateError)
            errorModel = errFactory.createUpdateError(err.message);
        else if (err instanceof CreateError)
            errorModel = errFactory.createCreateError(err.message);
        else if (err instanceof AuthenticationError)
            errorModel = errFactory.createAuthenticationError(err.message);
        else errorModel = errFactory.createInternalServerError(err.message);

        await errorModel.save();
        console.error(err);
        return sendErrorModel(res, errorModel);
    }

    next();
}
