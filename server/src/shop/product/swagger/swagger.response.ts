import { ApiResponseOptions } from '@nestjs/swagger';

export const getProductsApiResponse: ApiResponseOptions[] = [
  {
    status: 200,
    description: 'Get all products',
  },
  {
    status: 404,
    description: 'No products found',
  },
];
