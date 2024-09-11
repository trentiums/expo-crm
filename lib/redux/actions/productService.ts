import {
  deleteProductService,
  deleteProductServiceDocuments,
  editProductService,
  getProductServiceDetails,
  productServiceList,
  saveProductService,
} from '@api/productService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse } from '@type/api/api';
import { DeleteLeadDocumentsParams } from '@type/api/lead';
import {
  DeleteProductServicesParams,
  EditProductServiceParams,
  ProductServiceDetailsParams,
  ProductServiceDetailsResponse,
  ProductServiceListParams,
  ProductServiceResponse,
  SaveProductServiceParams,
} from '@type/api/productService';
import { withToastForError } from '@utils/thunk';

export const getProductServiceListAction = createAsyncThunk<
  ProductServiceResponse,
  ProductServiceListParams
>(
  'productService/getList',
  withToastForError(async (body) => {
    const response = await productServiceList(body);
    return response.data;
  }),
);

export const addProductServiceAction = createAsyncThunk<
  ApiResponse,
  SaveProductServiceParams
>(
  'productService/saveService',
  withToastForError(async (body) => {
    const response = await saveProductService(body);
    return response.data;
  }),
);
export const editProductServiceAction = createAsyncThunk<
  ApiResponse,
  EditProductServiceParams
>(
  'productService/editProductService',
  withToastForError(async (body) => {
    const response = await editProductService(body);
    return response.data;
  }),
);
export const deleteProductServiceAction = createAsyncThunk<
  ApiResponse,
  DeleteProductServicesParams
>(
  'productService/deleteProductService',
  withToastForError(async (body) => {
    const response = await deleteProductService(body);
    return { ...response.data, body };
  }),
);
export const getProductServiceDetailAction = createAsyncThunk<
  ProductServiceDetailsResponse,
  ProductServiceDetailsParams
>(
  'productService/productServiceDetail',
  withToastForError(async (body) => {
    const response = await getProductServiceDetails(body);
    return response.data;
  }),
);
export const deleteProductServiceDocumentsAction = createAsyncThunk<
  ApiResponse,
  DeleteLeadDocumentsParams
>(
  'productService/productServiceDetail',
  withToastForError(async (body) => {
    const response = await deleteProductServiceDocuments(body);
    return response.data;
  }),
);
