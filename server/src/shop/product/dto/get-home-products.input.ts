import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetHomeProductsInput {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  offset: number;

  @Field()
  category: string;

  @Field()
  subCategory: string;
}
