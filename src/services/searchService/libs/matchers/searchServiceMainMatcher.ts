export default class SearchServiceMainMatcher {
    public static get(searchPhase: string, regrexFlags = ""): RegExp {
        return new RegExp(`\\b${searchPhase}\\b[^']`, regrexFlags);
    }
}
