import {BelongsToMany, Column, Model, Table} from 'sequelize-typescript';
import {User} from "../users/user.model";
import {UserRole} from "./user_role.model";

interface RoleAttr {
    value: string;
    description: string;
}
@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleAttr> {
    @Column
    value: string;

    @Column
    description: string;

    @BelongsToMany( ()=> User, ()=> UserRole)
    users: User[];

}