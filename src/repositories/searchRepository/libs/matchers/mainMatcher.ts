export default class MainMatcher {
    public static get(searchPhase: string, regrexFlags = ""): RegExp {
        return new RegExp(`\\b${searchPhase}\\b[^']`, regrexFlags);
    }
}
