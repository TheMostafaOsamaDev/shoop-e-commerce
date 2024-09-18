import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ProductProvider } from 'src/dashboard/product/entities/product.provider';
import { ProductImageProvider } from 'src/uploader/entities/product-image.provider';
import { CartProvider } from '../entities/cart.provider';

@Module({
  providers: [ProductResolver, ProductService, ProductProvider, CartProvider],
})
export class ProductModule {}
