import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/user.model";

interface ProfileCreationAttr{
    userId: number,
    phoneNumber: string,
}

@Table({tableName: 'profiles'})
export class Profile extends Model<Profile, ProfileCreationAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: true})
    phoneNumber: string

    @Column({type: DataType.STRING, allowNull: true})
    location: string

    @Column({type: DataType.STRING, allowNull: true})
    occupation: string

    @Column({type: DataType.STRING, allowNull: true})
    birthDate: Date

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
}