import {
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import LangModel from "./lang.model";
import MovieTranslationModel from "./translations/movieTranslation.model";

@Table
export default class MovieModel extends Model {
    @Index
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
    })
    id: number;

    @Index
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
    lang: number; // pl

    @HasMany(() => MovieTranslationModel)
    movieTranslation: number;
}
