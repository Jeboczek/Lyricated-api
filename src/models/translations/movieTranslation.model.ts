import {
    Column,
    DataType,
    ForeignKey,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import LangModel from "../lang.model";
import MovieModel from "../movie.model";

@Table
export default class MovieTranslationModel extends Model {
    @Index
    @Column(DataType.INTEGER)
    @ForeignKey(() => LangModel)
    lang: number;

    @Index
    @Column(DataType.INTEGER)
    @ForeignKey(() => MovieModel)
    movie: number;
}
