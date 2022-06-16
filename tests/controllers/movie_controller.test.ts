import MovieModel from "../../src/models/database/movie_model";
import MovieRepository from "../../src/repositories/movie_repository";
import { MovieController } from "../../src/controllers/movie_controller";

jest.mock("../../src/repositories/movie_repository");
jest.mock("../../src/models/database/movie_model");

describe("MoviesController", () => {
    describe("getMovies", () => {
        let testMovies: MovieModel[];

        beforeEach(() => {
            const firstMovie = new MovieModel();
            firstMovie.id = 1;

            const secondMovie = new MovieModel();
            secondMovie.id = 2;

            testMovies = [firstMovie, secondMovie];
        });

        afterEach(jest.clearAllMocks);

        test("should return all movies from MovieRepository", async () => {
            const repo =
                new MovieRepository() as jest.MockedObject<MovieRepository>;
            repo.getMovies.mockImplementation(async () => testMovies);

            const moviesFromController = await new MovieController().getMovies(
                null,
                { repo }
            );

            expect(repo.getMovies).toBeCalled();
            expect(moviesFromController.movies.length).toBe(testMovies.length);
            for (const [i, movie] of testMovies.entries()) {
                expect(moviesFromController.movies[i].id).toBe(movie.id);
            }
        });
    });
});
