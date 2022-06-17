import {
    Column,
    DataType,
    ForeignKey,
    Index,
    Model,
    Table,
} from "sequelize-typescript";

import LangModel from "../langModel";
import LyricModel from "../lyricModel";

@Table
export default class LyricSentenceModel extends Model {
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
    @ForeignKey(() => LangModel)
    langId: number;

    @Index
    @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
    @ForeignKey(() => LyricModel)
    lyricId: number;

    @Column({ type: DataType.STRING(512), allowNull: false })
    content: string;
}
