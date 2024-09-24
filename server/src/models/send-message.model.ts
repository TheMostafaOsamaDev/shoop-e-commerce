import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SendMessage {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  status: number;

  @Field(() => String)
  where: string;

  @Field(() => String, { nullable: true })
  data?: String;
}
