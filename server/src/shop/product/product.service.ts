import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: typeof Product,
    @Inject(CART_REPOSITORY) private cartRepository: typeof Cart,
    @Inject(WISHLIST_REPOSITORY) private wishlistRepository: typeof Wishlist,
  ) {}

  async getFeaturedProducts(
    req: Request,
    limit: number = 10,
    offset: number = 0,
    category: string = '',
    subCategory: string = '',
  ) {
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

    console.log('~~~~~~~~~~ ProductService ~~~~~~~~~~');
    console.log({
      userId,
    });
    if (userId) {
      include.push({
        model: Wishlist,
        required: false,
        where: { userId },
        attributes: [],
      });
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

    return featured.map((f) => f.dataValues).sort((a, b) => a.id - b.id);
  }

  async getSingleProduct(id: string, req: Request) {
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

  async getCart(req: Request) {
    const userId = req.user.id;

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
              attributes: ['url'],
            },
          ],
        },
      ],
    });

    const transformedCart = cart.map((c) => {
      const product = {
        ...c.product.toJSON(),
        images: c.product.images.map((i) => i.url),
      };
      return {
        ...c.toJSON(),
        product,
      };
    });

    return transformedCart;
  }
}
