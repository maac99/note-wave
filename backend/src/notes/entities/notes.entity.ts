import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  Default,
  DataType,
} from 'sequelize-typescript';
import { Tag } from './tag.entity';

@Table
export class Note extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({
    allowNull: false
  })
  title: string;

  @Column(DataType.TEXT)
  content: string;

  @Column({
    allowNull: false
  })
  isArchived: boolean;

  @HasMany(() => Tag)
  tags: Tag[];
}
