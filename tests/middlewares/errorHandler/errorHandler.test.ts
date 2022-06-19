import { NextFunction, Request, Response } from "express";
import errorHandler from "../../../src/middlewares/errorHandler/errorHandler";

jest.mock("express");

describe("errorHandler", () => {
    let req: Request;
    let res: Response;
    let next: jest.MockedFunction<NextFunction>;

    beforeEach(() => {
        req = {} as Request;
        res = {} as Response;
        next = jest.fn();
    });

    afterEach(jest.clearAllMocks);

    test("should allow to call next function if err is null", async () => {
        await errorHandler(null, req, res, next);

        expect(next.mock.calls.length).toBe(1);
    });
});
