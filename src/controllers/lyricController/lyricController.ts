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

    /**
     * It allows to add a new Lyric to the database.
     * You need "contributor" permission to use this endpoint.
     **/
    @Post("new")
    @Security("api_key", ["contributor"])
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(422, "Error")
    public async createLyric(@Body() request: PostLyricRequest) {
        const lyric = await this.repo.createLyric(request);
        return LyricResponse.fromModel(lyric);
    }

    /**
     * It allows to get the first Lyric without quality set.
     * You need "client" permission to use this endpoint.
     **/
    @Get("without-quality")
    @Security("api_key", ["client"])
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

    /**
     * It allows you to get random Lyric from the database.
     * There are also additional parameters for filtering quality which are optional.
     * You need "client" permission to use this endpoint.
     **/
    @Get("random")
    @Security("api_key", ["client"])
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

    /**
     * It allows you to get the Lyric specified with id.
     * You need "client" permission to use this endpoint.
     **/
    @Get("{id}")
    @Security("api_key", ["client"])
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async getLyricById(@Path("id") lyricId: number) {
        const movie = await this.repo.getLyricById(lyricId);
        return LyricResponse.fromModel(movie);
    }

    /**
     * It allows you to update a Lyric that is already in the database.
     * You need "contributor" permission to use this endpoint.
     **/
    @Put("{id}")
    @Security("api_key", ["contributor"])
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async putLyric(
        @Path("id") id: number,
        @Body() request: PutLyricRequest
    ) {
        const lyric = await this.repo.updateLyric(id, request);
        return LyricResponse.fromModel(lyric);
    }

    /**
     * It allows you to delete a Lyric that is already in the database.
     * You need "contributor" permission to use this endpoint.
     **/
    @Delete("{id}")
    @Security("api_key", ["contributor"])
    @Response<LyricResponse>(200, "OK")
    @Response<ErrorResponse>(422, "Error")
    public async deleteLyric(@Path("id") id: number) {
        const lyric = await this.repo.deleteLyric(id);
        return LyricResponse.fromModel(lyric);
    }
}
