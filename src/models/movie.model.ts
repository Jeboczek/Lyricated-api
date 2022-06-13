import {
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from "sequelize-typescript";
import LangModel from "./lang.model";
import MovieTranslationModel from "./translations/movieTranslation.model";

@Table
export default class MovieModel extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
    })
    id: number;

    @Column(DataType.TINYINT)
    minutes: number; // 140

    @ForeignKey(() => LangModel)
    lang: number;

    @HasMany(() => MovieTranslationModel)
    movieTranslation: number;
}
