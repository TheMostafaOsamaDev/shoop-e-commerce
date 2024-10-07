import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { IsFloat } from 'sequelize-typescript';

export class ProductDto {
  @ApiProperty({
    type: Number,
    description: 'The id of the product',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: String,
    description: 'The name of the product',
    example: 'Product 1',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: Number,
    description: 'The description of the product',
    example: 'Description 1',
  })
  @IsInt()
  price: number;

  @ApiProperty({
    type: Number,
    description: 'The quantity of the product',
    example: 1,
  })
  @IsInt()
  quantity: number;

  @ApiProperty({
    type: String,
    description: 'The category of the product',
    example: 'Category 1',
  })
  @IsString()
  category: string;

  @ApiProperty({
    type: String,
    description: 'The subcategory of the product',
    example: 'Subcategory 1',
  })
  @IsString()
  subCategory: string;

  @ApiProperty({
    type: Number,
    description: 'The number of items sold',
    example: 1,
  })
  @IsInt()
  sold?: number;

  @ApiProperty({
    type: String,
    description: 'The date the product was created',
    example: '2021-12-12T12:12:12',
  })
  @IsString()
  createdAt: string;
}
