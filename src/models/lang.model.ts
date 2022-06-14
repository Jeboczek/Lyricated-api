import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import MovieTranslationModel from "./translations/movieTranslation.model";
import LyricSentenceModel from "./translations/lyricSentence.model";

@Table
export default class LangModel extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING(2),
        unique: true,
        allowNull: false,
    })
    short: string; // pl

    @HasMany(() => MovieTranslationModel)
    movieTranslations: MovieTranslationModel[];

    @HasMany(() => LyricSentenceModel)
    lyricSentences: LyricSentenceModel[];
}
