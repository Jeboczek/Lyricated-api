import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Index,
    Model,
    Table,
} from "sequelize-typescript";

import LangModel from "../langModel";
import MovieModel from "../movieModel";

@Table
export default class MovieNameModel extends Model {
    @Index
    @Column(DataType.INTEGER)
    @ForeignKey(() => LangModel)
    langId: string;

    @Index
    @Column(DataType.INTEGER)
    @ForeignKey(() => MovieModel)
    movieId: number;

    @Column(DataType.STRING(256))
    content: string;

    @BelongsTo(() => LangModel)
    lang: LangModel;

    @BelongsTo(() => MovieModel)
    movie: MovieModel;
}
