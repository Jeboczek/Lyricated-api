import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Response,
    Route,
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

    @Post("new")
    @Response<{ lang: string }>(200, "OK")
    @Response<ErrorResponse>(422, "Error")
    public async postLang(@Body() request: PostLangRequest) {
        const langModel = await this.repo.createLang(request.lang);
        return { lang: langModel.id };
    }

    @Get("all")
    @Response<{ langs: string[] }>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async getLangs() {
        const langModels = await this.repo.getLangs();
        return { langs: langModels.map((e) => e.id) };
    }

    @Delete("{lang}")
    @Response<{ lang: string }>(200, "OK")
    @Response<ErrorResponse>(404, "Error")
    public async deleteLang(@Path("lang") lang: string) {
        const langModel = await this.repo.deleteLang(lang);
        return { lang: langModel.id };
    }
}
