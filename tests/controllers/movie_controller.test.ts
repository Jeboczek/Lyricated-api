import Movie_model from "../../src/models/database/movie_model";
import Movie_repository from "../../src/repositories/movie_repository";
import { MovieController } from "../../src/controllers/movie_controller";

jest.mock("../../src/repositories/movie_repository");
jest.mock("../../src/models/database/movie_model");

describe("MoviesController", () => {
    describe("getMovies", () => {
        let testMovies: Movie_model[];

        beforeEach(() => {
            const firstMovie = new Movie_model();
            firstMovie.id = 1;

            const secondMovie = new Movie_model();
            secondMovie.id = 2;

            testMovies = [firstMovie, secondMovie];
        });

        afterEach(jest.clearAllMocks);

        test("should return all movies from MovieRepository", async () => {
            const repo =
                new Movie_repository() as jest.MockedObject<Movie_repository>;
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
