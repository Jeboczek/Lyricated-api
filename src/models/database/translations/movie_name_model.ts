import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import Lang_model from "../lang_model";
import Movie_model from "../movie_model";

@Table
export default class Movie_name_model extends Model {
    @Index
    @Column(DataType.INTEGER)
    @ForeignKey(() => Lang_model)
    langId: string;

    @Index
    @Column(DataType.INTEGER)
    @ForeignKey(() => Movie_model)
    movieId: number;

    @Column(DataType.STRING(256))
    content: string;

    @BelongsTo(() => Lang_model)
    lang: Lang_model;

    @BelongsTo(() => Movie_model)
    movie: Movie_model;
}
