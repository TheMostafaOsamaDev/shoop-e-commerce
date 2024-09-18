import { Table, Column, ForeignKey } from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Product } from 'src/dashboard/product/entities/product.entity';
import { User } from 'src/auth/entities/user.entity';

@Table({ timestamps: true })
export class Cart extends Model {
  @Column({ type: DataTypes.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataTypes.INTEGER, allowNull: false })
  @ForeignKey(() => Product)
  productId: number;

  @Column({ type: DataTypes.INTEGER, allowNull: false })
  @ForeignKey(() => User)
  userId: number;
}
