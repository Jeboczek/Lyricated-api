import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Put,
    Query,
    Response,
    Route,
    Security,
    Tags,
} from "tsoa";
import LyricResponse from "../../models/response/lyricResponse";
import LyricRepository from "../../repositories/lyricRepository/lyricRepository";
import ErrorResponse from "../../models/response/errors/errorResponse";
import PutLyricRequest from "../../models/request/putLyricRequest";
import PostLyricRequest from "../../models/request/postLyricRequest";

@Route("lyric")
@Tags("Lyric")
export class LyricController extends Controller {
    private repo: LyricRepository;

    constructor(repo?: LyricRepository) {
        super();
        this.repo = repo ?? new LyricRepository();
    }

    @Post("new")
    @Security("apiKey", ["contributor"])
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(422, "Error")
    public async createLyric(@Body() request: PostLyricRequest) {
        const lyric = await this.repo.createLyric(request);
        return LyricResponse.fromModel(lyric);
    }

    @Get("without-quality")
    @Security("apiKey", ["client"])
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
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
    @Security("apiKey", ["client"])
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
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

        return LyricResponse.fromModel(randomLyric);
    }

    @Get("{id}")
    @Security("apiKey", ["client"])
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async getLyricById(@Path("id") lyricId: number) {
        const movie = await this.repo.getLyricById(lyricId);
        return LyricResponse.fromModel(movie);
    }

    @Put("{id}")
    @Security("apiKey", ["contributor"])
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async putLyric(
        @Path("id") id: number,
        @Body() request: PutLyricRequest
    ) {
        const lyric = await this.repo.updateLyric(id, request);
        return LyricResponse.fromModel(lyric);
    }

    @Delete("{id}")
    @Security("apiKey", ["contributor"])
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(422, "Error")
    public async deleteLyric(@Path("id") id: number) {
        const lyric = await this.repo.deleteLyric(id);
        return LyricResponse.fromModel(lyric);
    }
}
