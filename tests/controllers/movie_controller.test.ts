import MovieModel from "../../src/models/database/movie_model";
import MovieRepository from "../../src/repositories/movie_repository";
import { MovieController } from "../../src/controllers/movie_controller";
import MovieResponse from "../../src/models/response/movie_response";
import NotFoundResponse from "../../src/models/response/errors/not_found_response";

jest.mock("../../src/repositories/movie_repository");
jest.mock("../../src/models/database/movie_model");

describe("MovieController", () => {
    let testMovies: MovieModel[];
    let repo: jest.MockedObject<MovieRepository>;

    beforeEach(() => {
        const firstMovie = new MovieModel();
        firstMovie.id = 1;

        const secondMovie = new MovieModel();
        secondMovie.id = 2;

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
                expect(moviesFromController.movies[i].id).toBe(
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
                expect(movieFromController.id).toBe(testMovies[movieId - 1].id);
            }
        });
        test("should NotFoundResponse if specified movie is unavailable", async () => {
            const movieId = 420;

            const movieFromController = await new MovieController(
                repo
            ).getMovie(movieId);

            expect(movieFromController).toBeInstanceOf(NotFoundResponse);
        });
    });
});
