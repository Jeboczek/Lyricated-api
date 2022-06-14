import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import MovieNameModel from "./translations/movieNameModel";
import LyricSentenceModel from "./translations/lyricSentence.model";

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
