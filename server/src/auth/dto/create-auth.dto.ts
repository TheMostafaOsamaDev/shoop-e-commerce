import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
  // TODO: Add password validation
  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsString()
  name: string;
}
