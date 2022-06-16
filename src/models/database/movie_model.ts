import {
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import Lang_model from "./lang_model";
import Movie_name_model from "./translations/movie_name_model";
import Episode_model from "./episode_model";
import Lyric_model from "./lyric_model";

@Table
export default class Movie_model extends Model {
    @Index
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
        unique: true,
        allowNull: true,
    })
    netflixId: number;

    @Column(DataType.TINYINT)
    minutes: number; // 140

    @Index
    @Column(DataType.TINYINT)
    @ForeignKey(() => Lang_model)
    lang: Lang_model; // pl

    @HasMany(() => Movie_name_model)
    movieNames: Movie_name_model[];

    @HasMany(() => Lyric_model)
    lyrics: Lyric_model[];

    @HasMany(() => Episode_model)
    episodes: Episode_model[];
}
