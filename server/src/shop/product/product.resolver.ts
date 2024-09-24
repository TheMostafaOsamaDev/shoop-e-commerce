import { GetHomeProductsInput } from './dto/get-home-products.input';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { SingleHomeProduct } from './models/single-home-product.model';
import { ExecutionContext, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtDecoderInterceptor } from 'src/interceptors/jwt-decoder.interceptors';
import { UserGuard } from 'src/guards/user.guard';
import { Product } from 'src/dashboard/product/models/product.model';
import { SendMessage } from 'src/models/send-message.model';

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
  getSingleProduct(
    @Args('id') id: string,
    @Context() context: ExecutionContext,
  ) {
    // @ts-ignore
    return this.productService.getSingleProduct(id, context?.req);
  }

  @Mutation(() => Product, { name: 'addToCart' })
  @UseGuards(UserGuard)
  addToCart(
    @Args('productId') productId: string,
    @Args('quantity') quantity: number,
    @Context() context: ExecutionContext,
  ) {
    // @ts-ignore
    return this.productService.addToCart(productId, quantity, context?.req);
  }

  @Mutation(() => SendMessage, { name: 'toggleWishlist' })
  @UseGuards(UserGuard)
  toggleWishlist(
    @Args('productId') productId: string,
    @Context() context: ExecutionContext,
  ) {
    // @ts-ignore
    return this.productService.toggleWishlist(productId, context?.req);
  }
}
