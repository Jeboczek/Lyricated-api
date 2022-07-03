import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import KeyModel from "../keyModel";
import PermissionModel from "../permissionModel";

@Table
export default class KeyToPermissionModel extends Model {
    @ForeignKey(() => KeyModel)
    @Column(DataType.INTEGER)
    keyId: number;

    @ForeignKey(() => PermissionModel)
    @Column(DataType.INTEGER)
    permissionId: number;
}
