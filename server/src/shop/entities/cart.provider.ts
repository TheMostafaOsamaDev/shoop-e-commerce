import { Cart } from './cart.entity';

export const CART_REPOSITORY = 'CART_REPOSITORY';

export const CartProvider = {
  provide: CART_REPOSITORY,
  useValue: Cart,
};
