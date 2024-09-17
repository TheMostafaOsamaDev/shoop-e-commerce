import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ProductProvider } from './entities/product.provider';
import { ProductImageProvider } from 'src/uploader/entities/product-image.provider';
import { AdminProvider } from 'src/auth/entities/admin.provider';
import { DatabaseProvider } from 'src/database/database.provider';

@Module({
  providers: [
    ProductResolver,
    ProductService,
    ProductProvider,
    ProductImageProvider,
    AdminProvider,
    DatabaseProvider,
  ],
})
export class ProductModule {}
