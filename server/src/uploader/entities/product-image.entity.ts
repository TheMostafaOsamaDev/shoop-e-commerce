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

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  // A name determines that if the image from an external source
  isExternal: boolean;

  @ForeignKey(() => Product)
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  productId: string;

  @BelongsTo(() => Product)
  product: Product;
}
