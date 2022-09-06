export default class SearchServiceSimilarMatcher {
    public static get(searchPhrase: string, regrexFlags = ""): RegExp {
        if (searchPhrase.length === 4)
            return new RegExp(
                `\\b\\S${searchPhrase}\\S*|\\b\\S?${searchPhrase}?[^${searchPhrase.slice(
                    -1
                )}.,?! ]\\S*`,
                regrexFlags
            );

        if (searchPhrase.length > 4)
            return new RegExp(
                `\\b\\S${searchPhrase}\\S*|\\b\\S?${searchPhrase}?[^${searchPhrase.slice(
                    -1
                )}.,?! ]\\S*|\\b${searchPhrase.slice(0, -1)}\\b`,
                regrexFlags
            );

        return new RegExp(
            `"\\b\\S${searchPhrase}\\S?[^\\s]*|\\b\\S?${searchPhrase}[^.,?! ][^\\s]*"`,
            regrexFlags
        );
    }
}
