import {
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import Movie_model from "./movie_model";
import Lyric_sentence_model from "./translations/lyric_sentence_model";

@Table
export default class Lyric_model extends Model {
    @Index
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Movie_model)
    @Column({ type: DataType.INTEGER, allowNull: false, unique: false })
    movieId: number;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    minutes: number;

    @Column({ type: DataType.SMALLINT, allowNull: true })
    quality: number;

    @HasMany(() => Lyric_sentence_model)
    sentences: Lyric_sentence_model[];
}
