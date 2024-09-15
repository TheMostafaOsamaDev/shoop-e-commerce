import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Post('product-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProductImage(@UploadedFile() image: Express.Multer.File) {
    return this.uploaderService.uploadProductImage(image);
  }

  @Delete('product-image/:url')
  async deleteProductImage(@Param('url') url: string) {
    return this.uploaderService.deleteProductImage(url);
  }
}
