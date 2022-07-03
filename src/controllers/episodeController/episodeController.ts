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

    /**
     * It allows to add a new Episode to the database.
     * You need "contributor" permission to use this endpoint.
     **/
    @Post("new")
    @Security("api_key", ["contributor"])
    @Response<EpisodeResponse>(200, "OK")
    @Response<ErrorResponse>(422, "Error")
    public async postEpisode(@Body() request: PostEpisodeRequest) {
        const episode = await this.repo.createEpisode(request);
        return EpisodeResponse.fromModel(episode);
    }

    /**
     * It allows you to get the Episode specified with id.
     * You need "client" permission to use this endpoint.
     **/
    @Get("{id}")
    @Security("api_key", ["client"])
    @Response<EpisodeResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async getEpisode(@Path("id") id: number) {
        const episode = await this.repo.getEpisode(id);

        return EpisodeResponse.fromModel(episode);
    }

    /**
     * It allows you to update a Episode that is already in the database.
     * You need "contributor" permission to use this endpoint.
     **/
    @Put("{id}")
    @Security("api_key", ["contributor"])
    @Response<EpisodeResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async putEpisode(
        @Path("id") id: number,
        @Body() request: PutEpisodeRequest
    ) {
        const updatedEpisode = await this.repo.updateEpisode(id, request);
        return EpisodeResponse.fromModel(updatedEpisode);
    }

    /**
     * It allows you to delete an Episode that is already in the database.
     * You need "contributor" permission to use this endpoint.
     **/
    @Delete("{id}")
    @Security("api_key", ["contributor"])
    @Response<EpisodeResponse>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async deleteEpisode(@Path("id") id: number) {
        const episode = await this.repo.deleteEpisode(id);
        return EpisodeResponse.fromModel(episode);
    }
}
