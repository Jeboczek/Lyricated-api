import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import KeyModel from "../keyModel";
import PermissionModel from "../permissionModel";

@Table
export default class KeyToPermissionModel extends Model {
    @ForeignKey(() => KeyModel)
    @Column
    keyId: number;

    @ForeignKey(() => PermissionModel)
    permissionId: number;
}
