import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetHomeProductsInput } from './dto/get-home-products.input';
import { PRODUCT_REPOSITORY } from 'src/dashboard/product/entities/product.provider';
import { Product } from 'src/dashboard/product/entities/product.entity';
import { ProductImage } from 'src/uploader/entities/product-image.entity';
import { Request } from 'express';
import { User } from 'src/auth/entities/user.entity';
import { CART_REPOSITORY } from '../entities/cart.provider';
import { Cart } from '../entities/cart.entity';
import { WISHLIST_REPOSITORY } from '../entities/wishlist.provider';
import { SendMessage } from 'src/models/send-message.model';
import { Wishlist } from '../entities/wishlist.entity';
import { Sequelize } from 'sequelize-typescript';
import { AnyFunction } from 'sequelize/types/utils';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: typeof Product,
    @Inject(CART_REPOSITORY) private cartRepository: typeof Cart,
    @Inject(WISHLIST_REPOSITORY) private wishlistRepository: typeof Cart,
  ) {}

  async getFeaturedProducts(
    getHomeProductsInput: GetHomeProductsInput,
    req: Request,
  ) {
    const limit = getHomeProductsInput.limit || 10;
    const offset = getHomeProductsInput.offset || 0;
    const category = getHomeProductsInput.category || '';
    const subCategory = getHomeProductsInput.subCategory || '';
    const userId = req?.user?.id;
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

    let include: any = [{ model: ProductImage, limit }];

    let attributes = {
      include: [],
    };

    if (userId) {
      include.push({
        model: Wishlist,
        required: false,
        where: { userId },
        attributes: [],
      });
      // TODO: Fix its order given it to you
      attributes.include.push([
        Sequelize.literal(`(
          SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END
          FROM Wishlists AS w
          WHERE w.productId = Product.id AND w.userId = '${userId}'
        )`),
        'isInWishlist',
      ]);
    }

    const featured = await this.productRepository.findAll({
      limit,
      offset,
      where,
      include,
      attributes,
    });

    return featured.map((f) => f.dataValues);
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

    let isInCart = false,
      isInWishlist = false;

    if (user) {
      const cart = await this.cartRepository.findOne({
        where: {
          productId: id,
          userId: user.id,
        },
      });
      const wishlist = await this.wishlistRepository.findOne({
        where: {
          productId: id,
          userId: user.id,
        },
      });

      console.log(wishlist);

      if (cart) {
        isInCart = true;
      }

      if (wishlist) {
        isInWishlist = true;
      }
    }

    return {
      ...product.toJSON(),
      isInCart,
      isInWishlist,
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

  async toggleWishlist(productId: string, req: Request): Promise<SendMessage> {
    // @ts-ignore
    const user: User = req.user;

    const product = await this.productRepository.findByPk(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let wishlist = await this.wishlistRepository.findOne({
      where: {
        productId: product.id,
        userId: user.id,
      },
    });

    if (wishlist) {
      wishlist.destroy();
      return {
        message: 'Product removed from wishlist',
        status: 200,
        where: 'toggleWishlist',
        data: product.id.toString(),
      };
    }

    wishlist = await this.wishlistRepository.create({
      productId: product.id,
      userId: user.id,
    });

    await wishlist.save();

    return {
      message: 'Product added to wishlist',
      status: 200,
      where: 'toggleWishlist',
      data: product.id.toString(),
    };
  }
}
