import Movie_model from "../../src/models/database/movie_model";
import Episode_model from "../../src/models/database/episode_model";
import Movie_repository from "../../src/repositories/movie_repository";
import { FindOptions } from "sequelize";

jest.mock("../../src/models/database/movie_model");
jest.mock("../../src/models/database/episode_model");

describe("Movie_repository", () => {
    let testMovies: Movie_model[];

    beforeEach(() => {
        const firstMovieModel = new Movie_model();
        firstMovieModel.id = 1;
        firstMovieModel.episodes = [];
        firstMovieModel.episodes.push(new Episode_model());

        const secondMovieModel = new Movie_model();
        secondMovieModel.episodes = [];
        secondMovieModel.id = 2;

        testMovies = [firstMovieModel, secondMovieModel];
    });

    afterEach(jest.resetAllMocks);

    describe("getMovies", () => {
        let spyFindAll: jest.SpyInstance;
        beforeEach(() => {
            spyFindAll = jest
                .spyOn(Movie_model, "findAll")
                .mockImplementation(async () => testMovies);
        });

        test("should return all movie models if source is null", async () => {
            const movies = await new Movie_repository().getMovies(null);

            expect(spyFindAll.mock.calls.length).toBe(1);
            expect(movies.length).toBe(testMovies.length);
        });

        test("should return only movies without episodes if source is only_movies", async () => {
            const movies = await new Movie_repository().getMovies(
                "only_movies"
            );

            expect(spyFindAll.mock.calls.length).toBe(1);
            expect(movies.length).toBe(1);
            expect(movies).toStrictEqual(
                testMovies.filter((e) => e.episodes.length == 0)
            );
        });

        test("should return only movies with episodes if source is only_series", async () => {
            const movies = await new Movie_repository().getMovies(
                "only_series"
            );

            expect(spyFindAll.mock.calls.length).toBe(1);
            expect(movies.length).toBe(1);
            expect(movies).toStrictEqual(
                testMovies.filter((e) => e.episodes.length != 0)
            );
        });
    });
    describe("getMovie", () => {
        let spyFindOne: jest.SpyInstance;

        beforeEach(() => {
            spyFindOne = jest
                .spyOn(Movie_model, "findOne")
                .mockImplementation(
                    async (options?: FindOptions | undefined) => {
                        if (options == null) return null;
                        const where = options.where as { id: number };
                        const wantedMovie = testMovies.find(
                            (e) => e.id === where.id
                        );
                        return wantedMovie == undefined ? null : wantedMovie;
                    }
                );
        });

        test("should return movie with provided id", async () => {
            const movieId = 2;
            const movie = await new Movie_repository().getMovie(movieId);

            expect(spyFindOne.mock.calls.length).toBe(1);
            expect(movie).not.toBeNull();
            expect(movie).toStrictEqual(
                testMovies.find((e) => e.id === movieId)
            );
        });

        test("should return null if can't find movie with provided id", async () => {
            const movieId = 3;
            const movie = await new Movie_repository().getMovie(movieId);

            expect(spyFindOne.mock.calls.length).toBe(1);
            expect(movie).toBeNull();
        });
    });
});
