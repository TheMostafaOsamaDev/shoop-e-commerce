import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserProvider } from './entities/user.provider';
import { AdminProvider } from './entities/admin.provider';

@Module({
  providers: [AuthResolver, AuthService, UserProvider, AdminProvider],
})
export class AuthModule {}
