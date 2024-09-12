import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/auth/entities/user.entity';

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

    sequelize.addModels([User]);

    await sequelize.sync();
    return sequelize;
  },
};
