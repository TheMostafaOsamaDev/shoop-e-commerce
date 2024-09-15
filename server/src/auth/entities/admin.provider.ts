import { Admin } from './admin.entity';

export const ADMIN_REPOSITORY = 'ADMIN_REPOSITORY';

export const AdminProvider = {
  provide: ADMIN_REPOSITORY,
  useValue: Admin,
};
