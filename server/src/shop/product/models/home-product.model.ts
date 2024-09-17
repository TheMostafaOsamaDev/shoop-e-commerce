import { Field, ObjectType } from '@nestjs/graphql';
import { SingleHomeProduct as Product } from './single-home-product.model';

@ObjectType()
export class HomeProducts {
  @Field(() => [Product])
  topSold: Product[];

  @Field(() => [Product])
  topRated: Product[];

  @Field(() => [Product])
  featured: Product[];
}
