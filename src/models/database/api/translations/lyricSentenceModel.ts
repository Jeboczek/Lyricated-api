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
    @Column({ type: DataType.STRING(2), allowNull: false })
    @ForeignKey(() => LangModel)
    langId: string;

    @Index
    @Column({ type: DataType.INTEGER, allowNull: false })
    @ForeignKey(() => LyricModel)
    lyricId: number;

    @Column({ type: DataType.STRING(512), allowNull: false })
    content: string;

    @BelongsTo(() => LyricModel, { foreignKey: "lyricId" })
    lyric: LyricModel;

    @BelongsTo(() => LangModel, { foreignKey: "langId" })
    lang: LangModel;
}
