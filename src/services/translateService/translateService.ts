import axios, { AxiosResponse } from "axios";

export default class TranslateService {
    readonly translatorUrl = "https://context.reverso.net/bst-query-service";

    private async request(
        url: string,
        data: { [key: string]: string | number }
    ): Promise<AxiosResponse> {
        return await axios.post(url, data, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:77.0) Gecko/20100101 Firefox/77.0",
            },
        });
    }

    async getTranslations(
        phase: string,
        fromLang: string,
        toLang: string
    ): Promise<string[]> {
        fromLang = fromLang.toLowerCase();
        toLang = toLang.toLowerCase();

        const data = (
            await this.request(this.translatorUrl, {
                source_lang: fromLang,
                target_lang: toLang,
                mode: 0,
                npage: 1,
                source_text: phase,
                target_text: "",
            })
        ).data;

        const words = [];
        for (const entry of data["dictionary_entry_list"]) {
            words.push(entry["term"]);
        }
        return words;
    }
}
