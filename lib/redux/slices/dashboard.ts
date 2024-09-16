import { logoutUserAction } from '@redux/actions/auth';
import {
  dashboardLeadListAction,
  dashboardLeadStageCountAction,
} from '@redux/actions/dashboard';
import { userRole } from '@redux/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserRole } from '@type/api/auth';
import {
  DashboardLeadListResponse,
  DashboardLeadStageCountResponse,
} from '@type/api/dashboard';
import {
  DashboardAdminLeadsProps,
  DashboardLeadsProps,
  LeadStageCountLeadList,
} from '@type/redux/slices/dashboard';
import {
  formatDashboardAdminLeadList,
  formatDashboardLeadList,
  formatDashboardLeadStageCountList,
} from '@utils/dashboard';

export interface DashboardState {
  currentPage: number;
  dataPerPage: number;
  lastPage: number;
  leadList: DashboardLeadsProps[] | DashboardAdminLeadsProps[];
  leadStageCount: LeadStageCountLeadList[];
}

const initialState: DashboardState = {
  currentPage: 0,
  dataPerPage: 0,
  lastPage: 0,
  leadList: [],
  leadStageCount: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      dashboardLeadListAction.fulfilled,
      (state, action: PayloadAction<DashboardLeadListResponse>) => {
        if (userRole === UserRole.Admin) {
          const data = formatDashboardAdminLeadList(action.payload.data.data);
          if (action.payload.data.current_page !== 1) {
            let mergedArray = state.leadList.concat(data);
            state.leadList = mergedArray;
          } else {
            state.leadList = data;
          }
        } else {
          const data = formatDashboardLeadList(action.payload.data.data);
          if (action.payload.data.current_page !== 1) {
            let mergedArray = state.leadList.concat(data);
            state.leadList = mergedArray;
          } else {
            state.leadList = data;
          }
        }
        state.currentPage = action.payload.data.current_page;
        state.dataPerPage = action.payload.data.per_page;
        state.lastPage = action.payload.data.last_page;
      },
    );
    builder.addCase(
      dashboardLeadStageCountAction.fulfilled,
      (state, action: PayloadAction<DashboardLeadStageCountResponse>) => {
        state.leadStageCount = formatDashboardLeadStageCountList(
          action.payload.data,
        );
      },
    );
    builder.addCase(logoutUserAction.fulfilled, () => {
      return initialState;
    });
  },
});

export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
