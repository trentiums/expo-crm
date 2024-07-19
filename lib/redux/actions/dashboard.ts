import { dashboardLeadList, dashboardLeadStageCountList } from '@api/dashboard';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  DashboardLeadListParams,
  DashboardLeadListResponse,
  DashboardLeadStageCountResponse,
} from '@type/api/dashboard';
import { withToastForError } from '@utils/thunk';

export const dashboardLeadListAction = createAsyncThunk<
  DashboardLeadListResponse,
  DashboardLeadListParams
>(
  'dashboard/leadList',
  withToastForError(async (body) => {
    const response = await dashboardLeadList(body);
    return response.data;
  }),
);

export const dashboardLeadStageCountAction = createAsyncThunk<
  DashboardLeadStageCountResponse,
  void
>(
  'dashboard/leadStageCount',
  withToastForError(async () => {
    const response = await dashboardLeadStageCountList();
    return response.data;
  }),
);
