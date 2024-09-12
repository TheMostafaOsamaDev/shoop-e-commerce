import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthModel } from './models/auth.model';
import { CreateAuthInput } from './dto/create-auth.input';

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthModel)
  async createUser(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.createUser(createAuthInput);
  }

  @Query(() => AuthModel)
  async getUser() {
    return 'User';
  }
}
