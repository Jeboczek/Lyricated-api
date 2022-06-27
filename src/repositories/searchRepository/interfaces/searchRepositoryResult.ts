import LyricModel from "../../../models/database/api/lyricModel";
import HighlightResponse from "../../../models/response/highlightResponse";

export default interface SearchRepositoryResult {
    lyricModel: LyricModel;
    fromHighlights: HighlightResponse[];
    toHighlights: HighlightResponse[];
}
