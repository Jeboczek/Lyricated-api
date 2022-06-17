import DatabaseService from "../../src/services/database_service";
import DatabaseConfig, {
    DatabaseConfigOptions,
} from "../../src/config/database_config";
import { Sequelize } from "sequelize-typescript/dist/sequelize/sequelize/sequelize";
import { SequelizeOptions } from "sequelize-typescript";

jest.mock("sequelize-typescript/dist/sequelize/sequelize/sequelize");

describe("DatabaseService", () => {
    let dbConf: DatabaseConfig;
    const mockedSequelize = Sequelize as jest.MockedClass<typeof Sequelize>;
    let config: DatabaseConfigOptions;
    beforeEach(() => {
        config = {
            user: "testUser",
            password: "testPass",
            name: "testName",
            host: "testHost",
            dialect: "sqlite",
            storage: "testStorage",
        };

        dbConf = new DatabaseConfig(config);

        mockedSequelize.mockReturnValue(new Sequelize());
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("should use values from DatabaseConfig", () => {
        new DatabaseService(dbConf);

        const call = mockedSequelize.mock.calls.at(-1);

        expect(call).not.toBeNull();

        if (call != null) {
            const options: SequelizeOptions = call[0] as SequelizeOptions;

            expect(options.dialect).toBe(config.dialect);
            expect(options.username).toBe(config.user);
            expect(options.password).toBe(config.password);
            expect(options.host).toBe(config.host);
            expect(options.database).toBe(config.name);
            expect(options.storage).toBe(config.storage);
        }
    });

    test("should call the sync method of the sequelize object if it has sync called", async () => {
        const inst = new DatabaseService(dbConf);

        const spy = jest
            .spyOn(inst.sequelize, "sync")
            .mockResolvedValue(inst.sequelize);

        await inst.sync();

        expect(spy.mock.calls.length).toBe(1);
    });
});
