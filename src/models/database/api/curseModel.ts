import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Index,
    Model,
    Table,
} from "sequelize-typescript";

import LangModel from "./langModel";

@Table
export default class CurseModel extends Model {
    @Index
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
    })
    id: number;

    @Index
    @Column(DataType.STRING(2))
    @ForeignKey(() => LangModel)
    langId: string;

    @Column({ type: DataType.STRING(255), allowNull: false })
    content: string;

    @BelongsTo(() => LangModel)
    lang: LangModel;
}
