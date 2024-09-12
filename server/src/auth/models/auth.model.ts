import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Authentication' })
export class AuthModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  avatar: string;

  @Field(() => String)
  createdAt: string;
}
