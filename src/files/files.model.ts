import {Column, DataType, Model, Table} from "sequelize-typescript";

interface FileCreationAttrs {
    essenceTable: string;
    essenceId: number;
    filePath: string;
}

@Table({tableName: 'files'})
export class File extends Model<File, FileCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    essenceTable: string;

    @Column({type: DataType.STRING, allowNull: true})
    essenceId: number;

    @Column({type: DataType.STRING, allowNull: false})
    filePath: string;
}