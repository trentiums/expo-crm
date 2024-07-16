import {
  ProductServiceListParams,
  ProductServiceResponse,
  SaveProductServiceParams,
} from '@type/api/productService';
import { api } from './api';
import { AxiosPromise } from 'axios';
import { ApiResponse } from '@type/api/api';

export const productServiceList = (
  body: ProductServiceListParams,
): AxiosPromise<ProductServiceResponse> =>
  api.get(`/product-services-list`, { params: body });

export const saveProductService = (
  body: SaveProductServiceParams,
): AxiosPromise<ApiResponse> =>
  api.post(`/save-product-services`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
