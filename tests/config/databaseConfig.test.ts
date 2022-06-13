import DatabaseConfig, {
    DatabaseConfigOptions,
} from "../../src/config/databaseConfig";

describe("DatabaseConfig", function () {
    let databaseConfigOptions: DatabaseConfigOptions;
    beforeEach(() => {
        databaseConfigOptions = {
            name: "testDB",
            user: "testUser",
            password: "testPass",
            host: "testHost",
            dialect: "sqlite",
            storage: "testPath",
        };
    });
    test("should have empty strings if no config parameter was passed and env is not set", () => {
        const databaseConfig = new DatabaseConfig();

        expect(databaseConfig.name).toBe("");
        expect(databaseConfig.user).toBe("");
        expect(databaseConfig.password).toBe("");
        expect(databaseConfig.host).toBe("");
        expect(databaseConfig.dialect).toBe("sqlite");
        expect(databaseConfig.storage).toBe("");
    });
    test("should implement the data from the config parameter", () => {
        const databaseConfig = new DatabaseConfig(databaseConfigOptions);

        expect(databaseConfig.name).toBe(databaseConfigOptions.name);
        expect(databaseConfig.user).toBe(databaseConfigOptions.user);
        expect(databaseConfig.password).toBe(databaseConfigOptions.password);
        expect(databaseConfig.host).toBe(databaseConfigOptions.host);
        expect(databaseConfig.dialect).toBe(databaseConfigOptions.dialect);
        expect(databaseConfig.storage).toBe(databaseConfigOptions.storage);
    });
    test("should use the contents of env if config is not given", () => {
        process.env.DB_NAME = "testDB";
        process.env.DB_USER = "testUser";
        process.env.DB_PASS = "testPass";
        process.env.DB_HOST = "testHost";
        process.env.DB_DIALECT = "sqlite";
        process.env.DB_STORAGE = "testStorage";
        const databaseConfig = new DatabaseConfig();

        expect(databaseConfig.name).toBe(process.env.DB_NAME);
        expect(databaseConfig.user).toBe(process.env.DB_USER);
        expect(databaseConfig.password).toBe(process.env.DB_PASS);
        expect(databaseConfig.host).toBe(process.env.DB_HOST);
        expect(databaseConfig.dialect).toBe(process.env.DB_DIALECT);
        expect(databaseConfig.storage).toBe(process.env.DB_STORAGE);
    });
    test("should treat the config parameter with priority", () => {
        process.env.DB_NAME = "envDB";

        const databaseConfig = new DatabaseConfig(databaseConfigOptions);

        expect(databaseConfig.name).toBe(databaseConfigOptions.name);
    });
});
