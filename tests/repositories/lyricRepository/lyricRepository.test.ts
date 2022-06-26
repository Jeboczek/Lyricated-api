import { FindOptions } from "sequelize/types";
import LyricModel from "../../../src/models/database/api/lyricModel";
import LyricRepository from "../../../src/repositories/lyricRepository/lyricRepository";
import { Op } from "sequelize";

jest.mock("../../../src/models/database/api/lyricModel");

function checkIfFindOptionsHaveX(
    findOptions: FindOptions | undefined,
    x: string
) {
    expect(findOptions).not.toBeUndefined();
    expect(findOptions?.where).not.toBeUndefined();
    if (findOptions !== undefined && findOptions.where !== undefined) {
        expect(findOptions.where).toHaveProperty(x);
        if (x in findOptions.where) {
            const where = findOptions.where as { [key: string]: any };
            return where[x];
        }
    }
}

describe("LyricRepository", () => {
    let firstLyricModel: LyricModel;
    let secondLyricModel: LyricModel;
    let allLyricModels: LyricModel[];
    let repo: LyricRepository;
    let spy: jest.SpyInstance;

    beforeEach(() => {
        repo = new LyricRepository();

        spy = jest
            .spyOn(LyricModel, "findOne")
            .mockResolvedValue(firstLyricModel);

        firstLyricModel = new LyricModel();
        firstLyricModel.id = 1;
        firstLyricModel.seconds = 100;
        firstLyricModel.quality = 5;
        firstLyricModel.sentences = [];

        secondLyricModel = new LyricModel();
        secondLyricModel.id = 2;
        secondLyricModel.seconds = 50;
        secondLyricModel.quality = null;
        secondLyricModel.sentences = [];

        allLyricModels = [firstLyricModel, secondLyricModel];
    });
    afterEach(jest.clearAllMocks);

    describe("getLyricById", () => {
        test("should ask model for a lyric with the given id", async () => {
            const testId = 543;

            await repo.getLyricById(testId);

            expect(spy.mock.calls.length).toBe(1);
            const lastCallOptions = spy.mock.lastCall[0];

            const id = checkIfFindOptionsHaveX(lastCallOptions, "id");

            expect(id).toBe(testId);
        });
    });

    describe("getLyricsByQuality", () => {
        let spy: jest.SpyInstance;

        beforeEach(() => {
            spy = jest
                .spyOn(LyricModel, "findAll")
                .mockResolvedValue(allLyricModels);
        });

        test("should ask model for a lyrics with the given quality", async () => {
            const testQuality = 100;

            await repo.getLyricsByQuality(100, { qualityEqual: testQuality });

            expect(spy.mock.calls.length).toBe(1);
            const lastCallOptions = spy.mock.lastCall[0];

            const quality = checkIfFindOptionsHaveX(lastCallOptions, "quality");

            expect(quality).toStrictEqual({
                [Op.eq]: testQuality,
            });
        });
        test("should ask model for a lyric with more than given quality", async () => {
            const testQuality = 24;

            await repo.getLyricsByQuality(100, {
                qualityBetterThan: testQuality,
            });

            expect(spy.mock.calls.length).toBe(1);
            const lastCallOptions = spy.mock.lastCall[0];

            const quality = checkIfFindOptionsHaveX(lastCallOptions, "quality");

            expect(quality).toStrictEqual({
                [Op.gt]: testQuality,
            });
        });
        test("should ask model for a lyric with lower than given quality", async () => {
            const testQuality = 22;

            await repo.getLyricsByQuality(100, {
                qualityLowerThan: testQuality,
            });

            expect(spy.mock.calls.length).toBe(1);
            const lastCallOptions = spy.mock.lastCall[0];

            const quality = checkIfFindOptionsHaveX(lastCallOptions, "quality");

            expect(quality).toStrictEqual({
                [Op.lt]: testQuality,
            });
        });
        test("should give a limit for LyricModel", async () => {
            const testLimit = 43;

            await repo.getLyricsByQuality(testLimit, { qualityEqual: 1 });

            expect(spy.mock.calls.length).toBe(1);
            const lastCallOptions = spy.mock.lastCall[0];

            checkIfFindOptionsHaveX(lastCallOptions, "quality");
            const limit = lastCallOptions.limit;

            expect(limit).toBe(testLimit);
        });
    });
});
