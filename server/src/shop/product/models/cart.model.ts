import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/dashboard/product/models/product.model';
import { Cart } from 'src/shop/entities/cart.entity';

@ObjectType()
export class CartModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  productId: number;

  @Field(() => String)
  userId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  quantity: number;

  @Field(() => Product)
  product: Product;
}
