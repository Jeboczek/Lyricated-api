import express from "express";
import morgan from "morgan";
import DatabaseService from "./services/databaseService";
import DatabaseConfig from "./config/databaseConfig";
import * as dotenv from "dotenv";

dotenv.config();

(async () => {
    const databaseConfig = new DatabaseConfig();
    const databaseService = DatabaseService.getInstance(databaseConfig);
    await databaseService.sync();
    console.log("Database initialized.");

    const app = express();

    app.use(express.json());
    app.use(morgan("short"));
    app.set("trust proxy", true);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
})();
