import express from "express";
import morgan from "morgan";
import DatabaseService from "./services/databaseService";
import DatabaseConfig from "./config/databaseConfig";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import SwaggerDoc from "./swagger.json";

dotenv.config();

(async () => {
    const databaseConfig = new DatabaseConfig();
    const databaseService = DatabaseService.getInstance(databaseConfig);
    await databaseService.sync();
    console.log("Database initialized.");

    const app = express();

    app.use(express.json());
    app.use(morgan("short"));
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(SwaggerDoc));
    app.set("trust proxy", true);
    RegisterRoutes(app);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
})();
