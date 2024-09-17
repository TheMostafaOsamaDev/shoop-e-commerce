import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductImage {
  @Field(() => String)
  name: string; // This will hold the image URL

  @Field(() => Boolean)
  isExternal: boolean; // Flag indicating whether the image is external
}
