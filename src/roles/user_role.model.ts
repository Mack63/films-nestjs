import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import { Role } from './role.model';
import {User} from "../users/user.model";

@Table({tableName: 'UserRole', createdAt: false, updatedAt: false})
export class UserRole extends Model<UserRole> {

    @ForeignKey(() => Role)
    @Column
    roleId: number;

    @ForeignKey(() => User)
    @Column
    userId: number;


}