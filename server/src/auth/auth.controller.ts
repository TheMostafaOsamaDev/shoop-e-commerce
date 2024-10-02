import { Body, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LogInAuthDto } from './dto/login-auth-dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/log-in')
  logIn(@Body() loginAuthDto: LogInAuthDto) {
    return this.authService.logIn(loginAuthDto);
  }
}
