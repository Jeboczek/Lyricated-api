import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import LangModel from "../lang.model";
import MovieModel from "../movie.model";

@Table
export default class MovieTranslationModel extends Model {
    @ForeignKey(() => LangModel)
    @Column(DataType.INTEGER)
    lang: number;

    @ForeignKey(() => MovieModel)
    @Column(DataType.INTEGER)
    movie: number;
}
