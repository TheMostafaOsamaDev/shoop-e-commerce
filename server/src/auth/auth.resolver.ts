import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthModel } from './models/auth.model';
import { CreateAuthInput } from './input/create-auth.input';
import { LoginAuthInput } from './input/login-auth.input';
import { AdminAuthInput } from './input/admin-auth.input';

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthModel)
  async createUser(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.createUser(createAuthInput);
  }

  @Query(() => AuthModel)
  async logIn(@Args('logInAuthInput') logInAuthInput: LoginAuthInput) {
    return this.authService.logIn(logInAuthInput);
  }

  @Query(() => AuthModel)
  async adminAuth(@Args('adminAuthInput') adminAuthInput: AdminAuthInput) {}
}
