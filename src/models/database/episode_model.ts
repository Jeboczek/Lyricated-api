import {
    Column,
    DataType,
    ForeignKey,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import MovieModel from "./movie_model";

@Table
export default class EpisodeModel extends Model {
    @Index
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.SMALLINT,
        unique: false,
        allowNull: false,
    })
    season: number;

    @Column({
        type: DataType.SMALLINT,
        unique: false,
        allowNull: false,
    })
    episode: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    netflixId: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    @ForeignKey(() => MovieModel)
    movieId: number;
}
