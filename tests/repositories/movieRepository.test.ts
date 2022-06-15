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
        secondMovieModel.id = 2;

        testMovies = [firstMovieModel, secondMovieModel];
    });

    test("should return all movie models if source is null", async () => {
        const spy = jest
            .spyOn(MovieModel, "findAll")
            .mockImplementation(async () => testMovies);

        const movies = await new MovieRepository().getMovies(null);

        expect(spy.mock.calls.length).toBe(1);
        expect(movies.length).toBe(testMovies.length);
    });
});
