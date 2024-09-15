import { ProductImage } from './product-image.entity';

export const PRODUCT_IMAGE_REPOSITORY = 'PRODUCT_IMAGE_REPOSITORY';
export const ProductImageProvider = {
  provide: PRODUCT_IMAGE_REPOSITORY,
  useValue: ProductImage,
};
