import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { ProductImageProvider } from './entities/product-image.provider';
import { MulterModule } from '@nestjs/platform-express';
import { multerProductConfig } from './config/multer.config';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [UploaderController],
  providers: [UploaderService, ProductImageProvider],
})
export class UploaderModule {}
