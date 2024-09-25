import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/dashboard/product/entities/product.entity';

@Table({ timestamps: true })
export class Wishlist extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, type: DataTypes.INTEGER })
  @ForeignKey(() => Product)
  productId: number;

  @Column({ allowNull: false, type: DataTypes.UUID })
  @ForeignKey(() => User)
  userId: string;
}
