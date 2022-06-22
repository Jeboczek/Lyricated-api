import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import MovieModel from "./movieModel";
import LyricSentenceModel from "./translations/lyricSentenceModel";

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
    minute: number;

    @Column({ type: DataType.SMALLINT, allowNull: true })
    quality: number | null;

    @HasMany(() => LyricSentenceModel)
    sentences: LyricSentenceModel[];

    @BelongsTo(() => MovieModel, { foreignKey: "movieId" })
    movie: MovieModel;
}
