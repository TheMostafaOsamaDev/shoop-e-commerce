import { ApiResponseOptions } from '@nestjs/swagger';

export const logInApiResponse: ApiResponseOptions[] = [
  {
    status: 200,
    description: 'User logged in',
  },

  {
    status: 404,
    description: 'User not found',
  },
];
