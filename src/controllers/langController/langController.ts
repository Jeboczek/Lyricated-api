import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Response,
    Route,
    Security,
    Tags,
} from "tsoa";
import LangRepository from "../../repositories/langRepository/langRepository";
import ErrorResponse from "../../models/response/errors/errorResponse";
import PostLangRequest from "../../models/request/postLangRequest";

@Route("lang")
@Tags("Lang")
export class LangController extends Controller {
    private repo: LangRepository;

    constructor(repo?: LangRepository) {
        super();
        this.repo = repo ?? new LangRepository();
    }

    /**
     * It allows to add a new Lang to the database.
     * You need "contributor" permission to use this endpoint.
     **/
    @Post("new")
    @Security("api_key", ["contributor"])
    @Response<{ lang: string }>(200, "OK")
    @Response<ErrorResponse>(422, "Error")
    public async postLang(@Body() request: PostLangRequest) {
        const langModel = await this.repo.createLang(request.lang);
        return { lang: langModel.id };
    }

    /**
     * It allows to get all Lang that are in the database.
     * You need "client" permission to use this endpoint.
     */
    @Get("all")
    @Security("api_key", ["client"])
    @Response<{ langs: string[] }>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async getLangs() {
        const langModels = await this.repo.getLangs();
        return { langs: langModels.map((e) => e.id) };
    }

    /**
     * It allows you to delete a Lang that is already in the database.
     * You need "contributor" permission to use this endpoint.
     **/
    @Delete("{lang}")
    @Security("api_key", ["contributor"])
    @Response<{ lang: string }>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async deleteLang(@Path("lang") lang: string) {
        const langModel = await this.repo.deleteLang(lang);
        return { lang: langModel.id };
    }
}
