import { FindOptions } from "sequelize/types";
import LyricModel from "../../../src/models/database/api/lyricModel";
import LyricRepository from "../../../src/repositories/lyricRepository/lyricRepository";
import { Op } from "sequelize";

jest.mock("../../../src/models/database/api/lyricModel");

function checkIfFindOptionsHaveX(
    findOptions: FindOptions<any> | undefined,
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

    beforeEach(() => {
        firstLyricModel = new LyricModel();
        firstLyricModel.id = 1;
        firstLyricModel.minutes = 100;
        firstLyricModel.quality = 5;
        firstLyricModel.sentences = [];

        secondLyricModel = new LyricModel();
        secondLyricModel.id = 2;
        secondLyricModel.minutes = 50;
        secondLyricModel.quality = null;
        secondLyricModel.sentences = [];

        allLyricModels = [firstLyricModel, secondLyricModel];
    });
    afterEach(jest.clearAllMocks);

    describe("getLyricById", () => {
        test("should ask model for a lyric with the given id", async () => {
            const testId = 543;
            const spy = jest
                .spyOn(LyricModel, "findOne")
                .mockResolvedValue(firstLyricModel);

            const repo = new LyricRepository();
            await repo.getLyricById(testId);

            expect(spy.mock.calls.length).toBe(1);
            const lastCallOptions = spy.mock.lastCall[0];

            const id = checkIfFindOptionsHaveX(lastCallOptions, "id");

            expect(id).toBe(testId);
        });
    })


    describe("getLyricsByQuality", () => {
        test("should ask model for a lyric with the given quality", async () => {
            const testQuality = 100;
            const spy = jest
                .spyOn(LyricModel, "findAll")
                .mockResolvedValue(allLyricModels);

            const repo = new LyricRepository();
            await repo.getLyricsByQuality(100, { qualityEqual: testQuality });

            expect(spy.mock.calls.length).toBe(1);
            const lastCallOptions = spy.mock.lastCall[0];

            const quality = checkIfFindOptionsHaveX(lastCallOptions, "quality");

            expect(quality).toStrictEqual({
                [Op.eq]: testQuality,
            });
        });
    })


});
