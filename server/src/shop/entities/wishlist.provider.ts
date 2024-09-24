import { Wishlist } from './wishlist.entity';

export const WISHLIST_REPOSITORY = 'WISHLIST_REPOSITORY';

export const WishProvider = {
  provide: WISHLIST_REPOSITORY,
  useValue: Wishlist,
};
