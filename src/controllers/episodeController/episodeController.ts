import { Body, Controller, Get, Path, Put, Response, Route, Tags } from "tsoa";
import EpisodeRepository from "../../repositories/episodeRepository/episodeRepository";
import EpisodeResponse from "../../models/response/episodeResponse";
import ErrorResponse from "../../models/response/errors/errorResponse";
import PutEpisodeRequest from "../../models/request/putEpisodeRequest";
import NotFoundError from "../../exceptions/notFoundError";

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
    @Response<ErrorResponse>(404, "Not Found")
    public async getEpisode(@Path("id") id: number) {
        const episode = await this.repo.getEpisode(id);

        if (episode === null) throw new NotFoundError();

        return EpisodeResponse.fromModel(episode);
    }
}
