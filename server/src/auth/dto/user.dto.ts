import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class UserDto {
  @IsUUID()
  @ApiProperty({
    example: 'b7d9e6d3-3b6b-4d64-8e5d-7b1c3b1b9d0e',
    type: String,
  })
  id: string;

  @IsEmail({}, { message: 'Invalid email' })
  @ApiProperty({
    example: 'folan@example.com',
    type: String,
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'Folan_Password555',
    type: String,
  })
  password: string;

  @IsString()
  @ApiProperty({
    example: 'folan',
    type: String,
  })
  username: string;

  @IsString()
  @ApiProperty({
    example: 'folan',
    type: String,
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: '2021-09-06T07:00:00.000Z',
    type: Date,
  })
  lastLogin: Date;

  @IsBoolean()
  @ApiProperty({
    example: false,
    type: Boolean,
  })
  isDeleted: boolean;

  @IsNumber()
  @ApiProperty({
    example: 145,
    type: Number,
  })
  totalPurchase: number;

  @IsString()
  @ApiProperty({
    example: 'default_user_avatar.png',
    type: String,
  })
  avatar: string;
}
