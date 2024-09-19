import { logoutUserAction } from '@redux/actions/auth';
import {
  deleteProductServiceAction,
  getLeadProductServiceListAction,
  getProductServiceDetailAction,
  getProductServiceListAction,
} from '@redux/actions/productService';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductServicesListResponse } from '@type/api/general';
import {
  LeadProductService,
  LeadProductServiceResponse,
  ProductService,
  ProductServiceDetailsResponse,
} from '@type/api/productService';
import {
  formatLeadProductService,
  formatProductServiceDetail,
  formatServiceListData,
} from '@utils/productService';

export interface ProductServiceState {
  productServiceList: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    serviceList: ProductService[];
  };
  leadProductService: LeadProductService[];
}
const initialState: ProductServiceState = {
  productServiceList: {
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0,
    serviceList: [],
  },
  productServiceDetail: {
    id: 0,
    name: '',
    description: '',
    documents: {
      uuid: '',
      original_url: '',
      mime_type: '',
      id: 0,
      name: '',
      size: 0,
    },
  },
  leadProductService: [],
};

const productServiceSlice = createSlice({
  name: 'productService',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProductServiceListAction.fulfilled,
      (state, action: PayloadAction<ProductServicesListResponse>) => {
        const data = formatServiceListData(action.payload.data?.data);
        if (
          action.payload.data.current_page !== 1 &&
          state.productServiceList.currentPage !==
            action.payload.data.current_page
        ) {
          let mergedArray = state.productServiceList.serviceList.concat(data);
          state.productServiceList.serviceList = mergedArray;
        } else {
          state.productServiceList.serviceList = data;
        }
        state.productServiceList.currentPage =
          action.payload.data?.current_page;
        state.productServiceList.lastPage = action.payload.data?.last_page;
        state.productServiceList.perPage = action.payload.data?.per_page;
        state.productServiceList.total = action?.payload?.data?.total;
      },
    );
    builder.addCase(logoutUserAction.fulfilled, () => {
      return initialState;
    });
    builder.addCase(
      getProductServiceDetailAction.fulfilled,
      (state, action: PayloadAction<ProductServiceDetailsResponse>) => {
        const data = formatProductServiceDetail(action.payload.data);
        state.productServiceList.serviceList =
          state.productServiceList.serviceList.map((item) =>
            item.id === data.id ? data : item,
          );
        state.productServiceDetail = data;
      },
    );
    builder.addCase(
      getLeadProductServiceListAction.fulfilled,
      (state, action: PayloadAction<LeadProductServiceResponse>) => {
        const data = formatLeadProductService(action.payload.data);
        state.leadProductService = data;
      },
    );

    builder.addCase(deleteProductServiceAction.fulfilled, (state, action) => {
      state.productServiceList.serviceList =
        state.productServiceList.serviceList?.filter(
          (item) => item.id !== action.payload?.body?.product_service_id,
        );
      const data = formatProductServiceDetail(action.payload.data);
      state.productServiceDetail = data;
    });
  },
});
export default productServiceSlice.reducer;
