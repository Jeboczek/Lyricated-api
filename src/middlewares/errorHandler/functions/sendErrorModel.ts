import ErrorModel from "../../../models/database/error/errorModel";
import ErrorResponse from "../../../models/response/errors/errorResponse";
import { Response } from "express";

export default function sendErrorModel(res: Response, errorModel: ErrorModel) {
    const errorResponse = ErrorResponse.fromErrorModel(errorModel);
    return res.status(errorModel.statusCode).json(errorResponse);
}
