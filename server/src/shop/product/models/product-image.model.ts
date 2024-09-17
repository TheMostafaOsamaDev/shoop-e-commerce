import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductImage {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => String)
  publicId: string;

  @Field(() => Boolean)
  isExternal: boolean;
}
