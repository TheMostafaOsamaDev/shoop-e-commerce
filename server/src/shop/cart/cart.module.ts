import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartProvider } from '../entities/cart.provider';
import { ProductProvider } from 'src/dashboard/product/entities/product.provider';
import { UserProvider } from 'src/auth/entities/user.provider';

@Module({
  controllers: [CartController],
  providers: [CartService, ProductProvider, CartProvider, UserProvider],
})
export class CartModule {}
