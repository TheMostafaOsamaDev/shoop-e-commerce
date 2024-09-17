import { GetHomeProductsInput } from './dto/get-home-products.input';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { SingleHomeProduct } from './models/single-home-product.model';

@Resolver(() => GetHomeProductsInput)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [SingleHomeProduct], { name: 'getFeaturedProducts' })
  getFeaturedProducts(
    @Args('GetHomeProductsInput') getHomeProductsInput: GetHomeProductsInput,
  ) {
    return this.productService.getFeaturedProducts(getHomeProductsInput);
  }
}
