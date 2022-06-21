import MovieModel from "../../../src/models/database/api/movieModel";
import MovieRepository from "../../../src/repositories/movieRepository/movieRepository";
import { MovieController } from "../../../src/controllers/movieController/movieController";
import MovieResponse from "../../../src/models/response/movieResponse";
import NotFoundError from "../../../src/exceptions/notFoundError";

jest.mock("../../../src/repositories/movieRepository/movieRepository");
jest.mock("../../../src/models/database/error/errorModel");

jest.mock("../../../src/models/database/api/movieModel");

describe("MovieController", () => {
    let testMovies: MovieModel[];
    let repo: jest.MockedObject<MovieRepository>;

    beforeEach(() => {
        const firstMovie = new MovieModel();
        firstMovie.id = 1;
        firstMovie.episodes = [];

        const secondMovie = new MovieModel();
        secondMovie.id = 2;
        secondMovie.episodes = [];

        testMovies = [firstMovie, secondMovie];

        repo = new MovieRepository() as jest.MockedObject<MovieRepository>;
        repo.getMovies.mockImplementation(async () => testMovies);
        repo.getMovie.mockImplementation(
            async (movieId): Promise<MovieModel | null> => {
                const foundMovie = testMovies.find((e) => e.id === movieId);
                if (foundMovie === undefined) return null;
                return foundMovie;
            }
        );
    });

    afterEach(jest.clearAllMocks);

    describe("getMovies", () => {
        test("should return all movies from MovieRepository", async () => {
            const moviesFromController = await new MovieController(
                repo
            ).getMovies(null);

            expect(repo.getMovies).toBeCalled();
            expect(moviesFromController.movies.length).toBe(testMovies.length);
            for (let i = 0; i < testMovies.length; i++) {
                expect(moviesFromController.movies[i].movie_id).toBe(
                    testMovies[i].id
                );
            }
        });
    });
    describe("getMovie", () => {
        test("should return specified movie from MovieRepository", async () => {
            const movieId = 1;

            const movieFromController = await new MovieController(
                repo
            ).getMovie(movieId);

            expect(movieFromController).toBeInstanceOf(MovieResponse);

            if (movieFromController instanceof MovieResponse) {
                expect(movieFromController.movie_id).toBe(
                    testMovies[movieId - 1].id
                );
            }
        });
        test("should NotFoundResponse if specified movie is unavailable", async () => {
            const movieId = 420;

            const controller = new MovieController(repo);

            await expect(controller.getMovie(movieId)).rejects.toThrow(
                NotFoundError
            );
        });
    });
});
