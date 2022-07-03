import {
    BelongsToMany,
    Column,
    DataType,
    Index,
    Model,
    Table,
} from "sequelize-typescript";
import PermissionModel from "./permissionModel";
import KeyToPermissionModel from "./relationships/keyToPermissionModel";

@Table
export default class KeyModel extends Model {
    @Index
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
    })
    id: number;

    @Column({ type: DataType.STRING(64), allowNull: false, unique: true })
    key: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    name: string;

    @BelongsToMany(() => PermissionModel, () => KeyToPermissionModel)
    permissions: PermissionModel[];
}
