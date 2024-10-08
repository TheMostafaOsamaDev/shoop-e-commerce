import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [ProductModule, CartModule]
})
export class ShopModule {}
