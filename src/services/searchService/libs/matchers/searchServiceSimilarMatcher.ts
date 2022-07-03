export default class SearchServiceSimilarMatcher {
    public static get(searchPhase: string, regrexFlags = ""): RegExp {
        if (searchPhase.length === 4)
            return new RegExp(
                `\\b\\S${searchPhase}\\S*|\\b\\S?${searchPhase}?[^${searchPhase.slice(
                    -1
                )}.,?! ]\\S*`,
                regrexFlags
            );

        if (searchPhase.length > 4)
            return new RegExp(
                `\\b\\S${searchPhase}\\S*|\\b\\S?${searchPhase}?[^${searchPhase.slice(
                    -1
                )}.,?! ]\\S*|\\b${searchPhase.slice(0, -1)}\\b`,
                regrexFlags
            );

        return new RegExp(
            `"\\b\\S${searchPhase}\\S?[^\\s]*|\\b\\S?${searchPhase}[^.,?! ][^\\s]*"`,
            regrexFlags
        );
    }
}
