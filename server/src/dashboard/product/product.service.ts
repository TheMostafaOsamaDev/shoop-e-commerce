import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PRODUCT_REPOSITORY } from './entities/product.provider';
import { Product } from './entities/product.entity';
import { PRODUCT_IMAGE_REPOSITORY } from 'src/uploader/entities/product-image.provider';
import { ProductImage } from 'src/uploader/entities/product-image.entity';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE_CONNECTION } from 'src/database/database.provider';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: typeof Product,
    @Inject(PRODUCT_IMAGE_REPOSITORY)
    private productImageRepository: typeof ProductImage,
    @Inject(SEQUELIZE_CONNECTION) private readonly sequelize: Sequelize,
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
    const transaction = await this.sequelize.transaction();
    let counter = 0;

    try {
      for (const product of createProductInputs) {
        const { title, price, quantity, category, subCategory, images } =
          product;

        const newProduct = await Product.create(
          {
            title,
            price,
            quantity,
            category,
            subCategory,
          },
          { transaction },
        );

        const imageRecords = images.map((image) => ({
          url: image,
          productId: newProduct.id,
          isExternal: true,
        }));

        await ProductImage.bulkCreate(imageRecords, { transaction });

        counter++;
      }

      await transaction.commit();
      console.log('Operation completed successfully');
    } catch (error) {
      console.log('Operation failed, rolling back transaction');
      console.log(error);
      await transaction.rollback();

      throw error;
    }

    return {
      message: 'Operation completed successfully',
      counts: counter,
    };
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
