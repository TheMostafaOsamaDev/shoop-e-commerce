import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LogInAuthDto {
  @ApiProperty({
    example: 'folan@gmail.com',
    type: String,
  })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({
    example: 'Folan_Password555',
    type: String,
  })
  @IsString()
  password: string;
}
