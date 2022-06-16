import {
    Column,
    DataType,
    ForeignKey,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import Lang_model from "../lang_model";
import Lyric_model from "../lyric_model";

@Table
export default class Lyric_sentence_model extends Model {
    @Index
    @Column({
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Index
    @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
    @ForeignKey(() => Lang_model)
    langId: number;

    @Index
    @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
    @ForeignKey(() => Lyric_model)
    lyricId: number;

    @Column({ type: DataType.STRING(512), allowNull: false })
    content: string;
}
