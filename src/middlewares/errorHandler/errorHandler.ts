import { NextFunction, Request, Response } from "express";
import { ValidateError } from "@tsoa/runtime";
import createErrorModelFactory from "./functions/createErrorModelFactory";
import sendErrorModel from "./functions/sendErrorModel";
import NotFoundError from "../../exceptions/notFoundError";
import ErrorModel from "../../models/database/error/errorModel";
import DeleteError from "../../exceptions/deleteError";
import UpdateError from "../../exceptions/updateError";

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
            errorModel = errFactory.createValidationError();
        else if (err instanceof NotFoundError)
            errorModel = errFactory.createNotFoundError();
        else if (err instanceof DeleteError)
            errorModel = errFactory.createDeleteError();
        else if (err instanceof UpdateError)
            errorModel = errFactory.createUpdateError();
        else errorModel = errFactory.createInternalServerError();

        await errorModel.save();
        console.error(err);
        return sendErrorModel(res, errorModel);
    }

    next();
}
