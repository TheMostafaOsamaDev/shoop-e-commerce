import { IsInt, IsString } from 'class-validator';

export class GetProducts {
  @IsInt()
  limit: number;

  @IsInt()
  offset: number;

  @IsString()
  category: string;

  @IsString()
  subCategory: string;
}
