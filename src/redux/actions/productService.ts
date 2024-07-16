import { productServiceList, saveProductService } from '@api/productService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse } from '@type/api/api';
import {
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
