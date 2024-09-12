import { Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthModel } from './models/auth.model';

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthModel)
  async createUser() {
    return 'User created';
  }
}
