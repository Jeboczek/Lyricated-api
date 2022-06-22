import {
    Body,
    Controller,
    Get,
    Path,
    Put,
    Query,
    Response,
    Route,
    Tags,
} from "tsoa";
import LyricResponse from "../../models/response/lyricResponse";
import LyricRepository from "../../repositories/lyricRepository/lyricRepository";
import ErrorResponse from "../../models/response/errors/errorResponse";
import NotFoundError from "../../exceptions/notFoundError";
import PutLyricRequest from "../../models/request/putLyricRequest";

@Route("lyric")
@Tags("Lyric")
export class LyricController extends Controller {
    private repo: LyricRepository;

    constructor(repo?: LyricRepository) {
        super();
        this.repo = repo ?? new LyricRepository();
    }

    @Get("without-quality")
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(404, "No more content")
    public async getLyricWithoutQuality() {
        const lyricWithoutQuality = await this.repo.getLyricWithoutQuality();

        if (lyricWithoutQuality != null)
            return LyricResponse.fromModel(lyricWithoutQuality);

        const err = new ErrorResponse();
        err.message = "There are no more lyrics without quality set";
        this.setStatus(404);
        return err;
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

    @Put("{id}")
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Not found")
    public async putLyric(
        @Path("id") id: number,
        @Body() reqBody: PutLyricRequest
    ) {
        const lyric = await this.repo.updateLyric(id, reqBody);

        return LyricResponse.fromModel(lyric);
    }
}
