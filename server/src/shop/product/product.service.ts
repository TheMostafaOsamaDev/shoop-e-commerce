import { Inject, Injectable } from '@nestjs/common';
import { GetHomeProductsInput } from './dto/get-home-products.input';
import { PRODUCT_REPOSITORY } from 'src/dashboard/product/entities/product.provider';
import { Product } from 'src/dashboard/product/entities/product.entity';
import { ProductImage } from 'src/uploader/entities/product-image.entity';
import { Request } from 'express';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: typeof Product,
  ) {}

  async getFeaturedProducts(getHomeProductsInput: GetHomeProductsInput) {
    const limit = getHomeProductsInput.limit || 10;
    const offset = getHomeProductsInput.offset || 0;
    const category = getHomeProductsInput.category || '';
    const subCategory = getHomeProductsInput.subCategory || '';
    let where = {};

    if (category) {
      where = {
        ...where,
        category,
      };
    }

    if (subCategory) {
      where = {
        ...where,
        subCategory,
      };
    }

    const featured = await this.productRepository.findAll({
      limit,
      offset,
      where,
      include: [{ model: ProductImage, limit }],
    });

    return featured;
  }

  async getSingleProduct(id: string, req: Request) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      include: [{ model: ProductImage }],
    });

    return product.toJSON();
  }
}
