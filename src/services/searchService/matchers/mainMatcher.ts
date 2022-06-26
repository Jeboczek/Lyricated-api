export default class MainMatcher {
    public static get(searchPhase: string): RegExp {
        return new RegExp(`\\b${searchPhase}\\b[^']`);
    }
}
