import ErrorModelFactoryOptions from "./interfaces/errorModelFactoryOptions";
import ErrorModel from "../errorModel";

export default class ErrorModelFactory {
    constructor(private options: ErrorModelFactoryOptions) {}

    create(): ErrorModel {
        const model = new ErrorModel();

        const { params, path, name, content, statusCode, message } =
            this.options;

        model.name = name;
        model.content = content;
        model.params = params;
        model.path = path;
        model.statusCode = statusCode;
        model.message = message;
        model.timestamp = new Date();

        return model;
    }

    createInternalServerError(message: string): ErrorModel {
        this.options.statusCode = 400;
        this.options.name = "Internal Server Error";
        this.options.message = message;

        return this.create();
    }

    createNotFoundError(message: string): ErrorModel {
        this.options.statusCode = 400;
        this.options.name = "Not Found";
        this.options.message = message;

        return this.create();
    }

    createValidationError(message: string): ErrorModel {
        this.options.statusCode = 400;
        this.options.name = "Validation Error";
        this.options.message = message;

        return this.create();
    }

    createUpdateError(message: string): ErrorModel {
        this.options.statusCode = 400;
        this.options.name = "Update Error";
        this.options.message = message;

        return this.create();
    }

    createDeleteError(message: string): ErrorModel {
        this.options.statusCode = 400;
        this.options.name = "Delete Error";
        this.options.message = message;

        return this.create();
    }

    createCreateError(message: string): ErrorModel {
        this.options.statusCode = 400;
        this.options.name = "Create Error";
        this.options.message = message;

        return this.create();
    }

    createAuthenticationError(message: string): ErrorModel {
        this.options.statusCode = 400;
        this.options.name = "Permission Denied Error";
        this.options.message = message;

        return this.create();
    }
}
