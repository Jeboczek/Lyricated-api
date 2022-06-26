export default class SimilarMatcher {
    public static get(searchPhase: string): RegExp {
        if (searchPhase.length === 4)
            return new RegExp(
                `\\b\\S${searchPhase}\\S*|\\b\\S?${searchPhase}?[^${searchPhase.slice(
                    -1
                )}.,?! ]\\S*`
            );

        if (searchPhase.length > 4)
            return new RegExp(
                `\\b\\S${searchPhase}\\S*|\\b\\S?${searchPhase}?[^${searchPhase.slice(
                    -1
                )}.,?! ]\\S*|\\b${searchPhase.slice(0, -1)}\\b`
            );

        return new RegExp(
            `"\\b\\S${searchPhase}\\S?[^\\s]*|\\b\\S?${searchPhase}[^.,?! ][^\\s]*"`
        );
    }
}
