export default class SearchServiceMainMatcher {
    public static get(searchPhrase: string, regrexFlags = ""): RegExp {
        return new RegExp(`\\b${searchPhrase}\\b[^']`, regrexFlags);
    }
}
