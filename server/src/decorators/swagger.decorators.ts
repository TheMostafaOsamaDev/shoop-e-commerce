import { applyDecorators } from '@nestjs/common';
import {
  ApiQuery,
  ApiQueryOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

export function ApiQueryDecorators(apiQueries: ApiQueryOptions[]) {
  return applyDecorators(...apiQueries.map((apiQuery) => ApiQuery(apiQuery)));
}

// export const ApiResponseDecorators
export function ApiResponseDecorators(apiResponses: ApiResponseOptions[]) {
  const allResponses: ApiResponseOptions[] = [
    {
      status: 500,
      description: 'Internal server error',
    },
    {
      status: 401,
      description: 'Unauthorized',
    },
    {
      status: 403,
      description: 'Forbidden',
    },
    {
      status: 400,
      description: 'Bad request',
    },
    ...apiResponses,
  ];

  return applyDecorators(
    ...allResponses.map((apiResponse) => ApiResponse(apiResponse)),
  );
}
