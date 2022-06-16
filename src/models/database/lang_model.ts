import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Movie_name_model from "./translations/movie_name_model";
import Lyric_sentence_model from "./translations/lyric_sentence_model";

@Table
export default class Lang_model extends Model {
    @Column({
        type: DataType.STRING(2),
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string; // pl

    @HasMany(() => Movie_name_model)
    movieTranslations: Movie_name_model[];

    @HasMany(() => Lyric_sentence_model)
    lyricSentences: Lyric_sentence_model[];
}
