import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/dashboard/product/entities/product.entity';

@Table({ timestamps: false })
export class ProductImage extends Model {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  url: string;

  @ForeignKey(() => Product)
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  productId: string;

  @BelongsTo(() => Product)
  product: Product;
}
