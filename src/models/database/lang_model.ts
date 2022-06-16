import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import MovieNameModel from "./translations/movie_name_model";
import LyricSentenceModel from "./translations/lyric_sentence_model";

@Table
export default class LangModel extends Model {
    @Column({
        type: DataType.STRING(2),
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string; // pl

    @HasMany(() => MovieNameModel)
    movieTranslations: MovieNameModel[];

    @HasMany(() => LyricSentenceModel)
    lyricSentences: LyricSentenceModel[];
}
