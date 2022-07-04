import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Put,
    Response,
    Route,
    Security,
    Tags,
} from "tsoa";
import LyricSentenceRepository from "../../repositories/lyricSentenceRepository/lyricSentenceRepository";
import ErrorResponse from "../../models/response/errors/errorResponse";
import LyricSentenceResponse from "../../models/response/translations/lyricSentenceResponse";
import { PostLyricSentenceRequest } from "../../models/request/postLyricSentenceRequest";
import PutLyricSentenceRequest from "../../models/request/putLyricSentenceRequest";

@Route("lyric-sentence")
@Tags("LyricSentence")
export class LyricSentenceController extends Controller {
    private repo: LyricSentenceRepository;

    constructor(repo?: LyricSentenceRepository) {
        super();
        this.repo = repo ?? new LyricSentenceRepository();
    }

    /**
     * It allows to add a new LyricSentence to the database.
     * You need "contributor" permission to use this endpoint.
     **/
    @Post("new")
    @Security("api_key", ["contributor"])
    @Response<LyricSentenceResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async createLyricSentence(
        @Body() request: PostLyricSentenceRequest
    ) {
        const lyricSentence = await this.repo.createLyricSentence(request);

        return LyricSentenceResponse.fromModel(lyricSentence);
    }

    /**
     * It allows you to get the LyricSentence specified with id.
     * You need "client" permission to use this endpoint.
     **/
    @Get("{id}")
    @Security("api_key", ["client"])
    @Response<LyricSentenceResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async getLyricSentence(@Path("id") id: number) {
        const lyricSentence = await this.repo.getLyricSentence(id);

        return LyricSentenceResponse.fromModel(lyricSentence);
    }

    /**
     * It allows you to update a LyricSentence that is already in the database.
     * You need "contributor" permission to use this endpoint.
     **/
    @Put("{id}")
    @Security("api_key", ["contributor"])
    @Response<PutLyricSentenceRequest>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async putLyricSentence(
        @Path("id") id: number,
        @Body() request: PutLyricSentenceRequest
    ) {
        const lyricSentence = await this.repo.updateLyricSentence(id, request);

        return LyricSentenceResponse.fromModel(lyricSentence);
    }

    /**
     * It allows you to delete a LyricSentence that is already in the database.
     * You need "contributor" permission to use this endpoint.
     **/
    @Delete("{id}")
    @Security("api_key", ["contributor"])
    @Response<LyricSentenceResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async deleteMovie(@Path("id") id: number) {
        const lyricSentence = await this.repo.deleteLyricSentence(id);

        return LyricSentenceResponse.fromModel(lyricSentence);
    }
}
