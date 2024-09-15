import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ProductImage } from 'src/uploader/entities/product-image.entity';
import { arrayToSnakeCase } from 'src/utils/array-to-snake-case';
import {
  ProductCategories,
  SubProductCategories,
} from 'src/utils/product-types';

@Table({ timestamps: true })
export class Product extends Model {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING, unique: true })
  title: string;

  @Column({ allowNull: false, type: DataType.FLOAT })
  price: number;

  @Column({ allowNull: false, type: DataType.INTEGER })
  quantity: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...arrayToSnakeCase(Object.values(ProductCategories))),
  })
  category: ProductCategories;

  @Column({
    allowNull: false,
    type: DataType.ENUM(
      ...arrayToSnakeCase(Object.values(SubProductCategories)),
    ),
  })
  subCategory: SubProductCategories;

  @HasMany(() => ProductImage)
  images: ProductImage[];
}
