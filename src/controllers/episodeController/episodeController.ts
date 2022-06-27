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
import EpisodeRepository from "../../repositories/episodeRepository/episodeRepository";
import EpisodeResponse from "../../models/response/episodeResponse";
import ErrorResponse from "../../models/response/errors/errorResponse";
import PutEpisodeRequest from "../../models/request/putEpisodeRequest";
import NotFoundError from "../../exceptions/notFoundError";
import PostEpisodeRequest from "../../models/request/postEpisodeRequest";

@Route("episode")
@Tags("Episode")
export class EpisodeController extends Controller {
    private repo: EpisodeRepository;

    constructor(repo?: EpisodeRepository) {
        super();
        this.repo = repo ?? new EpisodeRepository();
    }

    @Put("{id}")
    @Response<EpisodeResponse>(200, "")
    public async putEpisode(
        @Path("id") id: number,
        @Body() request: PutEpisodeRequest
    ) {
        const updatedEpisode = await this.repo.updateEpisode(id, request);
        return EpisodeResponse.fromModel(updatedEpisode);
    }

    @Get("{id}")
    @Response<EpisodeResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async getEpisode(@Path("id") id: number) {
        const episode = await this.repo.getEpisode(id);

        if (episode === null) throw new NotFoundError();

        return EpisodeResponse.fromModel(episode);
    }

    @Delete("{id}")
    @Response<EpisodeResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async deleteEpisode(@Path("id") id: number) {
        const episode = await this.repo.deleteEpisode(id);
        return EpisodeResponse.fromModel(episode);
    }

    @Post("new")
    @Response<EpisodeResponse>(200, "OK")
    @Response<ErrorResponse>(422, "Error")
    public async postEpisode(@Body() request: PostEpisodeRequest) {
        const episode = await this.repo.createEpisode(request);
        return EpisodeResponse.fromModel(episode);
    }
}
