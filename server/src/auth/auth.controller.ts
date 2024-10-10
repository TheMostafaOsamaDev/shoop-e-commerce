import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LogInAuthDto } from './dto/login-auth-dto';
import { LogInAdminDto } from './dto/login-admin.dto';
import { UserDto } from './dto/user.dto';
import { AdminDto } from './dto/admin.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/log-in')
  logIn(@Body() loginAuthDto: LogInAuthDto): Promise<UserDto> {
    return this.authService.logIn(loginAuthDto);
  }

  @Post('/admin')
  logInAdmin(@Body() logInAdmin: LogInAdminDto): Promise<AdminDto> {
    return this.authService.logInAdmin(logInAdmin);
  }
}
