import LyricModel from "../../../models/database/api/lyricModel";
import HighlightResponse from "../../../models/response/highlightResponse";

export default interface SearchServiceResult {
    lyricModel: LyricModel;
    fromHighlights: HighlightResponse[];
    toHighlights: HighlightResponse[];
}
