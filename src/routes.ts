/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
    Controller,
    fetchMiddlewares,
    FieldErrors,
    HttpStatusCodeLiteral,
    TsoaResponse,
    TsoaRoute,
    ValidateError,
    ValidationService
} from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MoviesController } from "./controllers/movies.controller";
import type { RequestHandler } from "express";
import * as express from "express";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    MovieNameResponse: {
        dataType: "refObject",
        properties: {
            lang: { dataType: "string", required: true },
            content: { dataType: "string", required: true },
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    MovieResponse: {
        dataType: "refObject",
        properties: {
            id: { dataType: "double", required: true },
            lang: { dataType: "string", required: true },
            type: {
                dataType: "union",
                subSchemas: [
                    { dataType: "enum", enums: ["movie"] },
                    { dataType: "enum", enums: ["serie"] },
                ],
                required: true,
            },
            netflix_id: { dataType: "double" },
            minutes: { dataType: "double", required: true },
            movie_names: {
                dataType: "array",
                array: { dataType: "refObject", ref: "MovieNameResponse" },
                required: true,
            },
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    MovieType: {
        dataType: "refAlias",
        type: {
            dataType: "union",
            subSchemas: [
                { dataType: "enum", enums: ["only_movies"] },
                { dataType: "enum", enums: ["only_series"] },
                { dataType: "enum", enums: [null] },
            ],
            validators: {},
        },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.get(
        "/movies/find",
        ...fetchMiddlewares<RequestHandler>(MoviesController),
        ...fetchMiddlewares<RequestHandler>(
            MoviesController.prototype.getMovies
        ),

        function MovieController_getMovies(
            request: any,
            response: any,
            next: any
        ) {
            const args = {
                type: {
                    in: "query",
                    name: "type",
                    required: true,
                    ref: "MovieType",
                },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MoviesController();

                const promise = controller.getMovies.apply(
                    controller,
                    validatedArgs as any
                );
                promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        }
    );
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get(
        "/movies/:id",
        ...fetchMiddlewares<RequestHandler>(MoviesController),
        ...fetchMiddlewares<RequestHandler>(
            MoviesController.prototype.getMovie
        ),

        function MovieController_getMovie(
            request: any,
            response: any,
            next: any
        ) {
            const args = {
                movieId: {
                    in: "path",
                    name: "id",
                    required: true,
                    dataType: "double",
                },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MoviesController();

                const promise = controller.getMovie.apply(
                    controller,
                    validatedArgs as any
                );
                promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        }
    );
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return (
            "getHeaders" in object &&
            "getStatus" in object &&
            "setStatus" in object
        );
    }

    function promiseHandler(
        controllerObj: any,
        promise: any,
        response: any,
        successStatus: any,
        next: any
    ) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers);
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(
        response: any,
        statusCode?: number,
        data?: any,
        headers: any = {}
    ) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (
            data &&
            typeof data.pipe === "function" &&
            data.readable &&
            typeof data._read === "function"
        ) {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(
        response: any
    ): TsoaResponse<HttpStatusCodeLiteral, unknown> {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case "request":
                    return request;
                case "query":
                    return validationService.ValidateParam(
                        args[key],
                        request.query[name],
                        name,
                        fieldErrors,
                        undefined,
                        { noImplicitAdditionalProperties: "throw-on-extras" }
                    );
                case "path":
                    return validationService.ValidateParam(
                        args[key],
                        request.params[name],
                        name,
                        fieldErrors,
                        undefined,
                        { noImplicitAdditionalProperties: "throw-on-extras" }
                    );
                case "header":
                    return validationService.ValidateParam(
                        args[key],
                        request.header(name),
                        name,
                        fieldErrors,
                        undefined,
                        { noImplicitAdditionalProperties: "throw-on-extras" }
                    );
                case "body":
                    return validationService.ValidateParam(
                        args[key],
                        request.body,
                        name,
                        fieldErrors,
                        undefined,
                        { noImplicitAdditionalProperties: "throw-on-extras" }
                    );
                case "body-prop":
                    return validationService.ValidateParam(
                        args[key],
                        request.body[name],
                        name,
                        fieldErrors,
                        "body.",
                        { noImplicitAdditionalProperties: "throw-on-extras" }
                    );
                case "formData":
                    if (args[key].dataType === "file") {
                        return validationService.ValidateParam(
                            args[key],
                            request.file,
                            name,
                            fieldErrors,
                            undefined,
                            {
                                noImplicitAdditionalProperties:
                                    "throw-on-extras",
                            }
                        );
                    } else if (
                        args[key].dataType === "array" &&
                        args[key].array.dataType === "file"
                    ) {
                        return validationService.ValidateParam(
                            args[key],
                            request.files,
                            name,
                            fieldErrors,
                            undefined,
                            {
                                noImplicitAdditionalProperties:
                                    "throw-on-extras",
                            }
                        );
                    } else {
                        return validationService.ValidateParam(
                            args[key],
                            request.body[name],
                            name,
                            fieldErrors,
                            undefined,
                            {
                                noImplicitAdditionalProperties:
                                    "throw-on-extras",
                            }
                        );
                    }
                case "res":
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, "");
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
