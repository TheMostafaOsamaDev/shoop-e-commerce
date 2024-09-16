import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';

@Resolver(() => Product)
@UseGuards(AdminGuard)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Mutation(() => [Product])
  createMultipleProducts(
    @Args('createProductInputs', { type: () => [CreateProductInput] })
    createProductInputs: CreateProductInput[],
  ) {
    return this.productService.createMultiple(createProductInputs);
  }

  // @Query(() => [Product], { name: 'product' })
  // findAll() {
  //   return this.productService.findAll();
  // }

  // @Query(() => Product, { name: 'product' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.productService.findOne(id);
  // }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
