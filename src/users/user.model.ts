import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {Role} from "../roles/role.model";
import {UserRole} from "../roles/user_role.model";

interface UserAttr {
    firstName: string;
    email: string;
    password: string;
}
@Table({tableName: 'users'})
export class User extends Model<User, UserAttr> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column({ defaultValue: true })
    isActive: boolean;

    @BelongsToMany( ()=> Role, ()=> UserRole)
    roles: Role[];
}