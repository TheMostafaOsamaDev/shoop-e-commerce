import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CART_REPOSITORY } from '../entities/cart.provider';
import { Cart } from '../entities/cart.entity';
import { Product } from 'src/dashboard/product/entities/product.entity';
import { User } from 'src/auth/entities/user.entity';
import { Request } from 'express';
import { PRODUCT_REPOSITORY } from 'src/dashboard/product/entities/product.provider';
import { ProductImage } from 'src/uploader/entities/product-image.entity';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART_REPOSITORY) private cartRepository: typeof Cart,
    @Inject(PRODUCT_REPOSITORY) private productRepository: typeof Product,
  ) {}

  async getCartItems(userId: string) {
    const cart = await this.cartRepository.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Product,
          include: [
            {
              model: ProductImage,
              as: 'images',
            },
          ],
        },
      ],
    });

    return cart;
  }

  async addToCart(productId: string, quantity: number, req: Request) {
    const user: User = req.user;

    const foundProduct = await this.productRepository.findByPk(productId);
    const product: Product = foundProduct.toJSON();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.quantity < quantity) {
      Logger.error('Product quantity is less than requested quantity');
      throw new NotFoundException(
        'Product quantity is less than requested quantity',
      );
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

    return {
      ...product,
      isInCart: true,
    };
  }

  // async getUserCart(req: Request) {
  //   const userId = req.user.id;

  //   const cart = await this.cartRepository.findAll({
  //     where: {
  //       userId,
  //     },
  //     include: [
  //       {
  //         model: Product,
  //         include: [
  //           {
  //             model: ProductImage,
  //             as: 'images',
  //             attributes: ['url'],
  //           },
  //         ],
  //       },
  //     ],
  //   });

  //   const transformedCart = cart.map((c) => {
  //     const product = {
  //       ...c.product.toJSON(),
  //       images: c.product.images.map((i) => i.url),
  //     };
  //     return {
  //       ...c.toJSON(),
  //       product,
  //     };
  //   });

  //   console.log(`~~~~~~~~~~ Getting Cart ~~~~~~~~~~`);
  //   console.log(transformedCart);

  //   return transformedCart;
  // }
}
