import { Request, Response } from "express";

export function notFoundHandler(_req: Request, res: Response): Response | void {
    res.status(404).send({
        message: "Not Found",
    });
}
