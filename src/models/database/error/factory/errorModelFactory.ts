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

    createInternalServerError(): ErrorModel {
        this.options.statusCode = 500;
        this.options.message = "Internal Server Error";

        return this.create();
    }

    createNotFoundError(): ErrorModel {
        this.options.statusCode = 404;
        this.options.message = "Not Found";

        return this.create();
    }

    createValidationError(): ErrorModel {
        this.options.statusCode = 400;
        this.options.message = "Validation Error";

        return this.create();
    }
}
