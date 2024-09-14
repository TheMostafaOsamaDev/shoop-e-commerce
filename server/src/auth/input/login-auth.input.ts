import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginAuthInput {
  @Field(() => String, { description: 'The email of the user' })
  email: string;

  @Field(() => String, { description: 'The password of the user' })
  password: string;
}
