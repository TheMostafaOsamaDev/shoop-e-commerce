import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ProductProvider } from './entities/product.provider';
import { ProductImageProvider } from 'src/uploader/entities/product-image.provider';

@Module({
  providers: [
    ProductResolver,
    ProductService,
    ProductProvider,
    ProductImageProvider,
  ],
})
export class ProductModule {}
