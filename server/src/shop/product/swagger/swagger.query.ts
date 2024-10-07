import { ApiQueryOptions } from '@nestjs/swagger';
// All Products Query
export const getProductsApiQuery: ApiQueryOptions[] = [
  {
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit of products to return',
  },
  {
    name: 'offset',
    required: false,
    type: Number,
    description: 'Offset of products to return',
  },
  {
    name: 'category',
    required: false,
    type: String,
    description: 'Category of products to return',
  },
  {
    name: 'subCategory',
    required: false,
    type: String,
    description: 'Subcategory of products to return',
  },
];

// Single Product Query
export const getSingleProductApiQuery: ApiQueryOptions[] = [
  {
    name: 'id',
    required: true,
    type: Number,
    description: 'Product ID',
  },
];
