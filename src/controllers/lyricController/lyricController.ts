import { Controller, Get, Path, Query, Response, Route, Tags } from "tsoa";
import LyricResponse from "../../models/response/lyricResponse";
import LyricRepository from "../../repositories/lyricRepository/lyricRepository";
import ErrorResponse from "../../models/response/errors/errorResponse";
import NotFoundError from "../../exceptions/notFoundError";

@Route("lyric")
@Tags("Lyric")
export class LyricController extends Controller {
    private repo: LyricRepository;

    constructor(repo?: LyricRepository) {
        super();
        this.repo = repo ?? new LyricRepository();
    }

    @Get("random")
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Not found")
    public async getRandomLyric(
        @Query("qualityBetterThan") qualityBetterThan?: number,
        @Query("qualityLowerThan") qualityLowerThan?: number,
        @Query("qualityEqual") qualityEqual?: number
    ) {
        const randomLyric = await this.repo.getRandomLyric({
            qualityEqual,
            qualityBetterThan,
            qualityLowerThan,
        });

        if (randomLyric != null) return LyricResponse.fromModel(randomLyric);

        throw new NotFoundError();
    }

    @Get("{id}")
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Not found")
    public async getLyricById(@Path("id") lyricId: number) {
        const movie = await this.repo.getLyricById(lyricId);

        if (movie != null) return LyricResponse.fromModel(movie);

        throw new NotFoundError();
    }
}
