import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LogInAdminDto {
  @ApiProperty({
    example: 'folan@gmail.com',
    type: String,
  })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({
    example: '452561',
    type: String,
    description: '6 Number for passkey',
  })
  @IsString()
  passkey: string;
}
