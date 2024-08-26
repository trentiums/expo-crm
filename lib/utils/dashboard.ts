import {
  DashboardLeadListItem,
  LeadStageCountLeadListItem,
} from '@type/api/dashboard';
import {
  DashboardLeadList,
  LeadStageCountLeadList,
} from '@type/redux/slices/dashboard';

export const formatDashboardLeadList = (
  data: DashboardLeadListItem[],
): DashboardLeadList[] => {
  return data?.map((item) => ({
    id: item?.id,
    name: item?.name,
    email: item?.email,
    phone: item?.phone,
    createdAt: item?.created_at,
    updatedAt: item?.created_at,
  }));
};

export const formatDashboardLeadStageCountList = (
  data: LeadStageCountLeadListItem[],
): LeadStageCountLeadList[] => {
  return data?.map((item) => ({
    leadConversionId: item.lead_conversion_id,
    leadCount: item.lead_count,
    name: item.name,
  }));
};
