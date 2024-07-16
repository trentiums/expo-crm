import { api } from './api';
import { AxiosPromise } from 'axios';
import {
  DashboardLeadListParams,
  DashboardLeadListResponse,
} from '@type/api/dashboard';

export const dashboardLeadList = (
  body: DashboardLeadListParams,
): AxiosPromise<DashboardLeadListResponse> =>
  api.get(`/dashboard-lead-list`, {
    params: body,
  });

export const dashboardLeadStageCountList =
  (): AxiosPromise<DashboardLeadListResponse> => api.get(`/lead-stage-count`);
