import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PRODUCT_REPOSITORY } from './entities/product.provider';
import { Product } from './entities/product.entity';
import { PRODUCT_IMAGE_REPOSITORY } from 'src/uploader/entities/product-image.provider';
import { ProductImage } from 'src/uploader/entities/product-image.entity';
import { Op } from 'sequelize';
import { createResponse } from 'src/utils/create-response';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: typeof Product,
    @Inject(PRODUCT_IMAGE_REPOSITORY)
    private productImageRepository: typeof ProductImage,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const imagesCount = await this.productImageRepository.count({
      where: {
        [Op.or]: createProductInput.images.map((image) => ({ url: image })),
      },
    });

    console.log({
      imagesCount,
      imagesLength: createProductInput.images.length,
      images: createProductInput.images,
    });

    if (imagesCount !== createProductInput.images.length) {
      throw new NotFoundException('Some images are not found');
    }

    const product = await this.productRepository.create<Product>({
      title: createProductInput.title,
      price: createProductInput.price,
      quantity: createProductInput.quantity,
      category: createProductInput.category,
      subCategory: createProductInput.subCategory,
    });

    console.log(product.toJSON());

    await this.productImageRepository.update(
      { productId: product.id },
      { where: { url: { [Op.in]: createProductInput.images } } },
    );

    return {
      ...product.toJSON(),
      images: createProductInput.images,
    };
  }

  findAll() {
    return `This action returns all product`;
  }

  addOne(createProductInput: CreateProductInput) {
    console.log(createProductInput);
  }

  async createMultiple(createProductInputs: CreateProductInput[]) {
    // console.log(createProductInputs);

    return 'success';
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
