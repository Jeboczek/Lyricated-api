import {
    BelongsToMany,
    Column,
    DataType,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import KeyToPermissionModel from "./relationships/keyToPermissionModel";
import KeyModel from "./keyModel";

@Table
export default class PermissionModel extends Model {
    @Index
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.STRING(64), allowNull: false, unique: true })
    name: string;

    @Column({ type: DataType.STRING(512), allowNull: true, unique: false })
    description: string;

    @BelongsToMany(() => KeyModel, () => KeyToPermissionModel)
    keys: KeyModel[];
}
