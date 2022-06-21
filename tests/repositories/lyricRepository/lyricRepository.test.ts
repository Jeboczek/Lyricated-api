import LyricModel from "../../../src/models/database/api/lyricModel";
import LyricRepository from "../../../src/repositories/lyricRepository/lyricRepository";

jest.mock("../../../src/models/database/api/lyricModel");

describe("LyricRepository", () => {
    let firstLyricModel: LyricModel;
    let secondLyricModel: LyricModel;

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
    });
    afterEach(jest.clearAllMocks);

    test("should return lyric with by provided id", async () => {
        const testId = 543;
        const spy = jest
            .spyOn(LyricModel, "findOne")
            .mockResolvedValue(firstLyricModel);

        const repo = new LyricRepository();
        await repo.getLyricById(testId);

        expect(spy.mock.calls.length).toBe(1);
        const lastCallOptions = spy.mock.lastCall[0];

        expect(lastCallOptions).not.toBeUndefined();
        expect(lastCallOptions?.where).not.toBeUndefined();
        if (
            lastCallOptions !== undefined &&
            lastCallOptions.where !== undefined
        ) {
            expect(lastCallOptions.where).toHaveProperty("id");
            if ("id" in lastCallOptions.where) {
                expect(lastCallOptions.where.id).toBe(testId);
            }
        }
    });
});
