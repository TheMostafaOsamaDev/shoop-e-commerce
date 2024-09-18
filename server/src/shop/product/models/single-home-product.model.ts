import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Product } from 'src/dashboard/product/models/product.model';
import { ProductImage } from './product-image.model';

@ObjectType()
export class SingleHomeProduct extends OmitType(Product, ['images']) {
  @Field(() => [ProductImage])
  images: ProductImage[];

  @Field(() => Boolean, { nullable: true })
  isInCart?: boolean;
}
