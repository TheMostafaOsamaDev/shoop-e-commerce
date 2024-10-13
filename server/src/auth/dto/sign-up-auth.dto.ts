import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class SignUpAuthDto {
  @ApiProperty({
    description: 'The email of the user',
    type: String,
  })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({
    description: 'The password the user entered',
    type: String,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The password the user entered',
    type: String,
  })
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    description: 'The name of the user',
    type: String,
  })
  @IsString()
  name: string;
}
