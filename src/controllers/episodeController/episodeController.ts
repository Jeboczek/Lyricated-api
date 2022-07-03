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
import EpisodeRepository from "../../repositories/episodeRepository/episodeRepository";
import EpisodeResponse from "../../models/response/episodeResponse";
import ErrorResponse from "../../models/response/errors/errorResponse";
import PostEpisodeRequest from "../../models/request/postEpisodeRequest";
import PutEpisodeRequest from "../../models/request/putEpisodeRequest";

@Route("episode")
@Tags("Episode")
export class EpisodeController extends Controller {
    private repo: EpisodeRepository;

    constructor(repo?: EpisodeRepository) {
        super();
        this.repo = repo ?? new EpisodeRepository();
    }

    @Post("new")
    @Security("apiKey", ["contributor"])
    @Response<EpisodeResponse>(200, "OK")
    @Response<ErrorResponse>(422, "Error")
    public async postEpisode(@Body() request: PostEpisodeRequest) {
        const episode = await this.repo.createEpisode(request);
        return EpisodeResponse.fromModel(episode);
    }

    @Get("{id}")
    @Security("apiKey", ["client"])
    @Response<EpisodeResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async getEpisode(@Path("id") id: number) {
        const episode = await this.repo.getEpisode(id);

        return EpisodeResponse.fromModel(episode);
    }

    @Put("{id}")
    @Security("apiKey", ["contributor"])
    @Response<EpisodeResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async putEpisode(
        @Path("id") id: number,
        @Body() request: PutEpisodeRequest
    ) {
        const updatedEpisode = await this.repo.updateEpisode(id, request);
        return EpisodeResponse.fromModel(updatedEpisode);
    }

    @Delete("{id}")
    @Security("apiKey", ["contributor"])
    @Response<EpisodeResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async deleteEpisode(@Path("id") id: number) {
        const episode = await this.repo.deleteEpisode(id);
        return EpisodeResponse.fromModel(episode);
    }
}
