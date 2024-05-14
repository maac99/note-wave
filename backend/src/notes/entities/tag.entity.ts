import { Table, Column, Model, DataType, PrimaryKey, NotNull, Default, BeforeCreate, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Note } from './notes.entity';

@Table
export class Tag extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  id: string;

  @Column({
    allowNull: false
  })
  name: string;

  @ForeignKey(() => Note)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  noteId: string;

  @BelongsTo(() => Note, { onDelete: 'CASCADE' })
  note: Note;
}