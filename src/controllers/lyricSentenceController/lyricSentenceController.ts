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

    @Post("new")
    @Response<LyricSentenceResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async createLyricSentence(
        @Body() request: PostLyricSentenceRequest
    ) {
        const lyricSentence = await this.repo.createLyricSentence(request);

        return LyricSentenceResponse.fromModel(lyricSentence);
    }

    @Get("{id}")
    @Response<LyricSentenceResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async getLyricSentence(@Path("id") id: number) {
        const lyricSentence = await this.repo.getLyricSentence(id);

        return LyricSentenceResponse.fromModel(lyricSentence);
    }

    @Put("{id}")
    @Response<PutLyricSentenceRequest>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async putLyricSentence(
        @Path("id") id: number,
        @Body() request: PutLyricSentenceRequest
    ) {
        const lyricSentence = await this.repo.updateLyricSentence(id, request);

        return LyricSentenceResponse.fromModel(lyricSentence);
    }

    @Delete("{id}")
    @Response<LyricSentenceResponse>(200, "OK")
    @Response<ErrorResponse>(400, "Error")
    public async deleteMovie(@Path("id") id: number) {
        const lyricSentence = await this.repo.deleteLyricSentence(id);

        return LyricSentenceResponse.fromModel(lyricSentence);
    }
}
