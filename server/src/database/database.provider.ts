import { Sequelize } from 'sequelize-typescript';
import { Admin } from 'src/auth/entities/admin.entity';
import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/dashboard/product/entities/product.entity';
import { ProductImage } from 'src/uploader/entities/product-image.entity';

export const DatabaseProvider = {
  provide: 'SEQUELIZE_CONNECTION',
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
    });

    sequelize.addModels([User, Admin, Product, ProductImage]);

    await sequelize.sync();
    return sequelize;
  },
};
