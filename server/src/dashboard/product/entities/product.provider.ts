import { Product } from './product.entity';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export const ProductProvider = {
  provide: PRODUCT_REPOSITORY,
  useValue: Product,
};
