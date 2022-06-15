import MovieModel from "../../src/models/database/movie.model";
import EpisodeModel from "../../src/models/database/episode.model";
import MovieRepository from "../../src/repositories/movieRepository";

jest.mock("../../src/models/database/movie.model");
jest.mock("../../src/models/database/episode.model");

describe("MovieRepository", () => {
    let testMovies: MovieModel[];

    beforeEach(() => {
        const firstMovieModel = new MovieModel();
        firstMovieModel.id = 1;
        firstMovieModel.episodes = [];
        firstMovieModel.episodes.push(new EpisodeModel());

        const secondMovieModel = new MovieModel();
        secondMovieModel.episodes = [];
        secondMovieModel.id = 2;

        testMovies = [firstMovieModel, secondMovieModel];
    });

    describe("getMovies", () => {
        let spy: jest.SpyInstance;
        beforeEach(() => {
            spy = jest
                .spyOn(MovieModel, "findAll")
                .mockImplementation(async () => testMovies);
        });

        afterEach(jest.resetAllMocks);

        test("should return all movie models if source is null", async () => {
            const movies = await new MovieRepository().getMovies(null);

            expect(spy.mock.calls.length).toBe(1);
            expect(movies.length).toBe(testMovies.length);
        });

        test("should return only movies without episodes if source is only_movies", async () => {
            const movies = await new MovieRepository().getMovies("only_movies");

            expect(spy.mock.calls.length).toBe(1);
            expect(movies.length).toBe(1);
            expect(movies).toStrictEqual(
                testMovies.filter((e) => e.episodes.length == 0)
            );
        });

        test("should return only movies with episodes if source is only_series", async () => {
            const movies = await new MovieRepository().getMovies("only_series");

            expect(spy.mock.calls.length).toBe(1);
            expect(movies.length).toBe(1);
            expect(movies).toStrictEqual(
                testMovies.filter((e) => e.episodes.length != 0)
            );
        });
    });
});
