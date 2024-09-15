import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PRODUCT_IMAGE_REPOSITORY } from './entities/product-image.provider';
import { ProductImage } from './entities/product-image.entity';
import { resizeAndSaveImages } from 'src/utils/resize-and-save-images';
import { createResponse } from 'src/utils/create-response';

@Injectable()
export class UploaderService {
  constructor(
    @Inject(PRODUCT_IMAGE_REPOSITORY)
    private productImageRepository: typeof ProductImage,
  ) {}

  async uploadProductImage(file: Express.Multer.File) {
    const { buffer, originalname } = file;

    if (!buffer || !originalname) throw new BadRequestException('Invalid file');

    const imageName = await resizeAndSaveImages(
      buffer,
      'product',
      originalname,
    );

    const productImage = await this.productImageRepository.create({
      url: imageName,
    });

    return createResponse({
      data: productImage.url,
      message: 'Image uploaded successfully',
    });
  }

  async deleteProductImage(url: string) {
    const formattedUrl = url.split('_').pop();

    const productImage = await this.productImageRepository.findOne({
      where: { url: formattedUrl },
    });

    if (!productImage) throw new BadRequestException('Image not found');

    await productImage.destroy();

    return createResponse({
      data: productImage.url,
      message: 'Image deleted successfully',
    });
  }
}
