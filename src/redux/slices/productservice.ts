import {logoutUserAction} from '@redux/actions/auth';
import { getProductServiceListAction } from '@redux/actions/productService';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductServicesListResponse } from '@type/api/general';
import { ProductService } from '@type/api/productService';
import { formatServiceListData } from '@utils/productService';

export interface ProductServiceState {
  productServiceList: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    serviceList: ProductService[];
  };
}
const initialState: ProductServiceState = {
  productServiceList: {
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    serviceList: [],
  },
};

const productServiceSlice = createSlice({
  name: 'productService',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProductServiceListAction.fulfilled,
      (state, action: PayloadAction<ProductServicesListResponse>) => {
        state.productServiceList.currentPage =
          action.payload.data?.current_page;
        state.productServiceList.lastPage = action.payload.data?.last_page;
        state.productServiceList.perPage = action.payload.data?.per_page;
        state.productServiceList.serviceList = formatServiceListData(
          action.payload.data?.data,
        );
      },
    );
    builder.addCase(logoutUserAction.fulfilled, () => {
      return initialState;
    });
  },
});
export default productServiceSlice.reducer;
