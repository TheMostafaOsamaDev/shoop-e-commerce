import { Sequelize } from 'sequelize-typescript';
import { Admin } from 'src/auth/entities/admin.entity';
import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/dashboard/product/entities/product.entity';
import { Cart } from 'src/shop/entities/cart.entity';
import { Wishlist } from 'src/shop/entities/wishlist.entity';
import { ProductImage } from 'src/uploader/entities/product-image.entity';

export const SEQUELIZE_CONNECTION = 'SEQUELIZE_CONNECTION';

export const DatabaseProvider = {
  provide: SEQUELIZE_CONNECTION,
  useFactory: async () => {
    const sequelize = new Sequelize({
      dialect: process.env.DIALECT as any,
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      // define: {
      //   freezeTableName: true,
      // },
      dialectOptions: {
        charset: 'utf8mb4',
      },
      define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      },
    });

    sequelize.addModels([User, Admin, Product, ProductImage, Cart, Wishlist]);

    await sequelize.sync();
    return sequelize;
  },
};
