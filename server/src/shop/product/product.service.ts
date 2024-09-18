import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { GetHomeProductsInput } from './dto/get-home-products.input';
import { PRODUCT_REPOSITORY } from 'src/dashboard/product/entities/product.provider';
import { Product } from 'src/dashboard/product/entities/product.entity';
import { ProductImage } from 'src/uploader/entities/product-image.entity';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/auth/entities/user.entity';
import { CART_REPOSITORY } from '../entities/cart.provider';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: typeof Product,
    @Inject(CART_REPOSITORY) private cartRepository: typeof Cart,
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
    // @ts-ignore
    const user: User = req.user;

    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      include: [{ model: ProductImage }],
    });

    let isInCart = false;

    if (user) {
      const cart = await this.cartRepository.findOne({
        where: {
          productId: id,
          userId: user.id,
        },
      });

      if (cart) {
        isInCart = true;
      }
    }

    return {
      ...product.toJSON(),
      isInCart,
    };
  }

  async addToCart(productId: string, quantity: number, req: Request) {
    // @ts-ignore
    const user: User = req.user;
    let product: Product;

    try {
      const foundProduct = await this.productRepository.findByPk(productId);
      product = foundProduct.toJSON();
    } catch (error) {
      throw new Error('Product not found');
    }

    let cart = await this.cartRepository.findOne({
      where: {
        productId,
        userId: user.id,
      },
    });

    if (cart) {
      cart.quantity += quantity;
      cart.save();
    } else {
      cart = await this.cartRepository.create({
        productId,
        userId: user.id,
        quantity,
      });
    }

    return product;
  }
}
