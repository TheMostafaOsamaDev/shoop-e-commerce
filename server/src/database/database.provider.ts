import { Sequelize } from 'sequelize-typescript';

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
      define: {
        freezeTableName: true,
      },
    });

    await sequelize.sync();
    return sequelize;
  },
};
