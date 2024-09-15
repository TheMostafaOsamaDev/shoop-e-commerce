import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: true })
export class Admin extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  username: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    defaultValue: 'admin_user_avatar.png',
  })
  avatar: string;

  @Column({ allowNull: false, type: DataType.STRING, defaultValue: 'admin' })
  role: string;

  @Column({ allowNull: true, type: DataType.DATE })
  deletedAt: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  lastLogin: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  lastLogout: Date;
}
