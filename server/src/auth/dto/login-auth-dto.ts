import { IsEmail, IsString } from 'class-validator';

export class LogInAuthDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString()
  password: string;
}
