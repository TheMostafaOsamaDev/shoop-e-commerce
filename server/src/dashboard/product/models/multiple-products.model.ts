import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MultipleProducts {
  @Field(() => Int)
  counts: number;

  @Field(() => String)
  message: string;
}
