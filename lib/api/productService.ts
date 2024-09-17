import {
  DeleteProductServicesParams,
  EditProductServiceParams,
  ProductServiceDetailsParams,
  ProductServiceDetailsResponse,
  ProductServiceListParams,
  ProductServiceResponse,
  SaveProductServiceParams,
} from '@type/api/productService';
import { api } from './api';
import { AxiosPromise } from 'axios';
import { ApiResponse } from '@type/api/api';
import { DeleteLeadDocumentParams } from '@type/api/lead';

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

export const editProductService = (
  body: EditProductServiceParams,
): AxiosPromise<ApiResponse> =>
  api.post(`/update-product-services`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const deleteProductService = (
  body: DeleteProductServicesParams,
): AxiosPromise<ApiResponse> => api.post(`/delete-product-services`, body);

export const getProductServiceDetails = (
  body: ProductServiceDetailsParams,
): AxiosPromise<ProductServiceDetailsResponse> =>
  api.get(`/details-product-services`, { params: body });
export const deleteProductServiceDocument = (
  body: DeleteLeadDocumentParams,
): AxiosPromise<ApiResponse> =>
  api.post('/delete-product-service-document', body);
