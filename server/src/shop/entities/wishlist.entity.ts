import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: true })
export class Wishlist extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, type: DataTypes.INTEGER })
  productId: number;

  @Column({ allowNull: false, type: DataTypes.UUIDV4 })
  userId: string;
}
