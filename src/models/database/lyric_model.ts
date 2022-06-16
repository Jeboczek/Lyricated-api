import {
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import MovieModel from "./movie_model";
import LyricSentenceModel from "./translations/lyric_sentence_model";

@Table
export default class LyricModel extends Model {
    @Index
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => MovieModel)
    @Column({ type: DataType.INTEGER, allowNull: false, unique: false })
    movieId: number;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    minutes: number;

    @Column({ type: DataType.SMALLINT, allowNull: true })
    quality: number;

    @HasMany(() => LyricSentenceModel)
    sentences: LyricSentenceModel[];
}
