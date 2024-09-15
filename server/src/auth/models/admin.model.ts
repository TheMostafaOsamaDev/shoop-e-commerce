import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Authentication' })
export class AdminModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  avatar: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  role: string;
}
