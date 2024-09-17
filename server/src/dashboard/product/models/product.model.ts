import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { ProductImage } from './image.model';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => String)
  category: string;

  @Field(() => String)
  subCategory: string;

  @Field(() => [ProductImage])
  images: ProductImage[];
}
