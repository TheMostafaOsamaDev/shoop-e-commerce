import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import {
  ApiQueryDecorators,
  ApiResponseDecorators,
} from 'src/decorators/swagger.decorators';
import { getProductsApiQuery } from './swagger/swagger.query';
import { getProductsApiResponse } from './swagger/swagger.response';
import { Request } from 'express';

@ApiTags('Product')
@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiQueryDecorators(getProductsApiQuery)
  @ApiResponseDecorators(getProductsApiResponse)
  getProducts(
    @Req() req: Request,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('category') category?: string,
    @Query('subCategory') subCategory?: string,
  ) {
    // Pass all 5 arguments as required
    return this.productService.getFeaturedProducts(
      req, // req
      limit, // limitParam
      offset, // offsetParam
      category, // categoryParam
      subCategory, // subCategoryParam
    );
  }
}
