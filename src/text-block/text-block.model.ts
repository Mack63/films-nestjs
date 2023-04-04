import {Column, DataType, Model, Table} from "sequelize-typescript";

interface TextBlockCreationAttrs {
    uniqueName: string;
    name: string;
    image: string;
    content: string;
    group: string
}

@Table({tableName: 'textBlock'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    uniqueName: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING, allowNull: false})
    group: string;

    @Column({type: DataType.STRING, allowNull: true})
    image: string;
}