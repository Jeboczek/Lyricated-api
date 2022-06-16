import {
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import LangModel from "./lang_model";
import MovieNameModel from "./translations/movie_name_model";
import EpisodeModel from "./episode_model";
import LyricModel from "./lyric_model";

@Table
export default class MovieModel extends Model {
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
    @ForeignKey(() => LangModel)
    lang: LangModel; // pl

    @HasMany(() => MovieNameModel)
    movieNames: MovieNameModel[];

    @HasMany(() => LyricModel)
    lyrics: LyricModel[];

    @HasMany(() => EpisodeModel)
    episodes: EpisodeModel[];
}
