import { Body, Controller, Get, Path, Put, Response, Route, Tags } from "tsoa";
import EpisodeRepository from "../../repositories/episodeRepository/episodeRepository";
import EpisodeResponse from "../../models/response/episodeResponse";
import ErrorResponse from "../../models/response/errors/errorResponse";
import PutEpisodeRequest from "../../models/request/putEpisodeRequest";

@Route("episode")
@Tags("Episode")
export class EpisodeController extends Controller {
    private repo: EpisodeRepository;

    constructor(repo?: EpisodeRepository) {
        super();
        this.repo = repo ?? new EpisodeRepository();
    }

    @Put("{id}")
    @Response<EpisodeResponse>(200, "Not Found")
    public async putEpisode(
        @Path("id") id: number,
        @Body() request: PutEpisodeRequest
    ) {
        const updatedEpisode = await this.repo.updateEpisode(id, request);
        return EpisodeResponse.fromModel(updatedEpisode);
    }

    @Get("{id}")
    @Response<EpisodeResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Not Found")
    public async getEpisode(@Path("id") id: number) {
        return await this.repo.getEpisode(id);
    }
}
