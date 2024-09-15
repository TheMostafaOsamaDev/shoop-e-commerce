import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
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

  @Field(() => [String])
  images: string[];
}
