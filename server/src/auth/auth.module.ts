import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserProvider } from './entities/user.provider';
import { AdminProvider } from './entities/admin.provider';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, UserProvider, AdminProvider],
  controllers: [AuthController],
})
export class AuthModule {}
