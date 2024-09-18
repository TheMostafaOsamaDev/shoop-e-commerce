import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductImage {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => String, { nullable: true })
  publicId: string | null;

  @Field(() => Boolean)
  isExternal: boolean;
}
