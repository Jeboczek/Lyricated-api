import SearchRepositoryAbstractHandler from "./searchRepositoryAbstractHandler";
import SearchRepositoryState from "../../interfaces/searchRepositoryState";
import TranslateService from "../../../../services/translateService/translateService";

export default class SearchRepositoryTranslationsHandler extends SearchRepositoryAbstractHandler {
    public async handle(state: SearchRepositoryState) {
        const {
            search_phase: phase,
            from_lang_id: fromLang,
            to_lang_id: toLang,
        } = state.request;

        const translationService = new TranslateService();

        state.translations = await translationService.getTranslations(
            phase,
            fromLang,
            toLang
        );
        return await super.handle(state);
    }
}
