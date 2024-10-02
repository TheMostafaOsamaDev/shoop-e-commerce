import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserProvider } from './entities/user.provider';
import { AdminProvider } from './entities/admin.provider';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthResolver, AuthService, UserProvider, AdminProvider],
  controllers: [AuthController],
})
export class AuthModule {}
