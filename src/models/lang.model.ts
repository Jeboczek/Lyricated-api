import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export default class LangModel extends  Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    })
    id: number

    @Column({
        type: DataType.STRING(2),
        unique: true,
        allowNull: false,
    })
    short: string // pl
}
