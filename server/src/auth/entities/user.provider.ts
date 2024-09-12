import { User } from './user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export const UserProvider = {
  provide: USER_REPOSITORY,
  useValue: User,
};
