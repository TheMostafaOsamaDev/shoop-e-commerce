import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserProvider } from './entities/user.provider';

@Module({
  providers: [AuthResolver, AuthService, UserProvider],
})
export class AuthModule {}
