import DatabaseConfig, {
    DatabaseConfigOptions,
} from "../../src/config/databaseConfig";

describe("DatabaseConfig", function () {
    const databaseConfigOptions: DatabaseConfigOptions = {
        name: "testDB",
        user: "testUser",
        password: "testPass",
        host: "testHost",
        driver: "testDriver",
    };

    test("should have empty strings if no config parameter was passed and env is not set", () => {
        const databaseConfig = new DatabaseConfig();

        expect(databaseConfig.name).toBe("");
        expect(databaseConfig.user).toBe("");
        expect(databaseConfig.password).toBe("");
        expect(databaseConfig.host).toBe("");
        expect(databaseConfig.driver).toBe("");
    });
    test("should implement the data from the config parameter", () => {
        const databaseConfig = new DatabaseConfig(databaseConfigOptions);

        expect(databaseConfig.name).toBe(databaseConfigOptions.name);
        expect(databaseConfig.user).toBe(databaseConfigOptions.user);
        expect(databaseConfig.password).toBe(databaseConfigOptions.password);
        expect(databaseConfig.host).toBe(databaseConfigOptions.host);
        expect(databaseConfig.driver).toBe(databaseConfigOptions.driver);
    });
    test("should use the contents of env if config is not given", () => {
        process.env.DB_NAME = "testDB";
        process.env.DB_USER = "testUser";
        process.env.DB_PASS = "testPass";
        process.env.DB_HOST = "testHost";
        process.env.DB_DRIVER = "testDriver";
        const databaseConfig = new DatabaseConfig();

        expect(databaseConfig.name).toBe(process.env.DB_NAME);
        expect(databaseConfig.user).toBe(process.env.DB_USER);
        expect(databaseConfig.password).toBe(process.env.DB_PASS);
        expect(databaseConfig.host).toBe(process.env.DB_HOST);
        expect(databaseConfig.driver).toBe(process.env.DB_DRIVER);
    });
    test("should treat the config parameter with priority", () => {
        process.env.DB_NAME = "envDB";

        const databaseConfig = new DatabaseConfig(databaseConfigOptions);

        expect(databaseConfig.name).toBe(databaseConfigOptions.name);
    });
    test("should generate a connection path according to the values provided", () => {
        const databaseConfig = new DatabaseConfig(databaseConfigOptions);

        const { name, user, password, host, driver } = databaseConfigOptions;

        expect(databaseConfig.constructConnectionPath()).toBe(
            `${driver}://${user}:${password}@${host}/${name}`
        );
    });
});
