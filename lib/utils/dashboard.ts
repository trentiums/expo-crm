import {
  DashboardAdminLeadListItem,
  DashboardLeadListItem,
  LeadStageCountLeadListItem,
} from '@type/api/dashboard';
import {
  DashboardLeadsProps,
  LeadStageCountLeadList,
} from '@type/redux/slices/dashboard';

export const formatDashboardLeadList = (
  data: DashboardLeadListItem[],
): DashboardLeadsProps[] => {
  return data?.map((item) => ({
    id: item?.id,
    name: item?.name,
    email: item?.email,
    phone: item?.phone,
    createdAt: item?.created_at,
    updatedAt: item?.created_at,
    leadStatusId: item?.lead_status_id,
  }));
};
export const formatDashboardAdminLeadList = (
  data: DashboardAdminLeadListItem[],
) => {
  return data?.map((item) => ({
    id: item.user_id,
    name: item.user_name,
    total: item.total_leads,
    initial: item.lead_initial_count,
    proposal: item.lead_proposal_count,
    negotiation: item.lead_negotiation_count,
    closedWon: item.lead_closed_won_count,
    closedLost: item.lead_closed_lost_count,
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
