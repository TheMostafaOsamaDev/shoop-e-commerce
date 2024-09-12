import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
  @Field(() => String, { description: 'The email of the user' })
  email: string;

  @Field(() => String, { description: 'The password of the user' })
  password: string;

  @Field(() => String, { description: 'The password of the user' })
  confirmPassword: string;

  @Field(() => String, { description: 'The name of the user' })
  name: string;
}
