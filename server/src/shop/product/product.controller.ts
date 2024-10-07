import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import {
  ApiQueryDecorators,
  ApiResponseDecorators,
} from 'src/decorators/swagger.decorators';
import {
  getProductsApiQuery,
  getSingleProductApiQuery,
} from './swagger/swagger.query';
import {
  getProductsApiResponse,
  getSingleProductApiResponse,
} from './swagger/swagger.response';
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
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit?: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset?: number,
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

  @Get(':id')
  @ApiResponseDecorators(getSingleProductApiResponse)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The id of the product',
    example: '1',
  })
  getProduct(@Req() req: Request, @Param('id') id: string) {
    console.log({ id });

    return this.productService.getSingleProduct(id, req);
  }
}
