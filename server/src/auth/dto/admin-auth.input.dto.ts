import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AdminAuthInput {
  @Field(() => String, { description: 'The email of admin' })
  email: string;

  @Field(() => String, { description: 'Passkey of admin' })
  passkey: string;
}
