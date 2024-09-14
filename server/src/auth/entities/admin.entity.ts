import { Model } from 'sequelize';
import { Column, DataType, Table } from 'sequelize-typescript';

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

  @Column({ allowNull: false, type: DataType.STRING, defaultValue: 'admin' })
  role: string;

  @Column({ allowNull: false, type: DataType.STRING })
  deletedAt: string;

  @Column({ allowNull: false, type: DataType.STRING })
  lastLogin: string;

  @Column({ allowNull: false, type: DataType.STRING })
  lastLogout: string;
}
