import { GetHomeProductsInput } from './dto/get-home-products.input';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { SingleHomeProduct } from './models/single-home-product.model';
import { Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { JwtDecoderInterceptor } from 'src/interceptors/jwt-decoder.interceptors';

@Resolver(() => GetHomeProductsInput)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [SingleHomeProduct], { name: 'getFeaturedProducts' })
  getFeaturedProducts(
    @Args('GetHomeProductsInput') getHomeProductsInput: GetHomeProductsInput,
  ) {
    return this.productService.getFeaturedProducts(getHomeProductsInput);
  }

  @Query(() => SingleHomeProduct, { name: 'getSingleProduct' })
  @UseInterceptors(JwtDecoderInterceptor)
  getSingleProduct(@Args('id') id: string, @Req() req: Request) {
    return this.productService.getSingleProduct(id, req);
  }
}
