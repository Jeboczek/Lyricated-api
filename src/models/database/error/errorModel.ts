import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export default class ErrorModel extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    uuid: string;

    @Column({
        type: DataType.SMALLINT,
        allowNull: true,
    })
    statusCode: number;

    @Column({
        type: DataType.STRING(32),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false,
    })
    message: string;

    @Column({
        type: DataType.STRING(5120),
        allowNull: false,
    })
    content: string;

    @Column({
        type: DataType.STRING(1024),
        allowNull: true,
    })
    params?: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: true,
    })
    path?: string;

    @Column(DataType.DATE)
    timestamp: Date;
}
