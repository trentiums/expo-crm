import { LeadListData } from '@type/api/lead';

export const formatLeadList = (data: LeadListData[]) => {
  return data?.map((item) => ({
    id: item?.id,
    companyUserId: item?.company_user_id,
    name: item?.name,
    email: item?.email,
    phone: item?.phone,
    companyName: item?.company_name,
    companySize: item?.company_size,
    webSite: item?.company_website,
    budget: item?.budget,
    timeLine: item?.time_line,
    description: item?.description,
    dealAmount: item?.deal_amount,
    winCloseReason: item?.win_close_reason,
    dealCloseDate: item?.deal_close_date,
    leadStatusId: item?.lead_status_id,
    leadChannelId: item?.lead_channel_id,
    leadConversionId: item?.lead_conversion_id,
    countryId: item?.country_id,
    createdAt: item?.created_at,
    updatedAt: item?.created_at,
    assignTo: item.assign_to_user_id,
    budgetCurrencyCode: item.budget_currency_id,
    timeFrameType: item.timeline_timeframe,
    dealAmountCurrencyCode: item.deal_amount_currency_id,
    productService: item.product_services.map((item) => ({
      id: item?.id,
      companyUserId: item?.company_user_id,
      name: item?.name,
      description: item?.description,
      createdAt: item?.created_at,
      updatedAt: item?.updated_at,
      deletedAt: item?.deleted_at,
    })),
    documents: item?.documents?.map((item) => ({
      id: item?.id,
      uri: item?.original_url,
      name: item?.name,
      size: item?.size,
      type: item?.mime_type,
    })),
  }));
};
export const formatLeadDetails = (item: LeadListData) => {
  return {
    id: item?.id,
    companyUserId: item?.company_user_id,
    name: item?.name,
    email: item?.email,
    phone: item?.phone,
    companyName: item?.company_name,
    companySize: item?.company_size,
    webSite: item?.company_website,
    budget: item?.budget,
    timeLine: item?.time_line,
    description: item?.description,
    dealAmount: item?.deal_amount,
    winCloseReason: item?.win_close_reason,
    dealCloseDate: item?.deal_close_date,
    leadStatusId: item?.lead_status_id,
    leadChannelId: item?.lead_channel_id,
    leadConversionId: item?.lead_conversion_id,
    countryId: item?.country_id,
    createdAt: item?.created_at,
    updatedAt: item?.created_at,
    assignTo: item?.assign_to_user_id,
    budgetCurrencyCode: item.budget_currency_id,
    dealAmountCurrencyCode: item.deal_amount_currency_id,
    timeFrameType: item.timeline_timeframe,
    productService: item.product_services.map((item) => ({
      id: item?.id,
      companyUserId: item?.company_user_id,
      name: item?.name,
      description: item?.description,
      createdAt: item?.created_at,
      updatedAt: item?.updated_at,
      deletedAt: item?.deleted_at,
    })),
    documents: item?.documents?.map((item) => ({
      id: item?.id,
      uri: item?.original_url,
      name: item?.name,
      size: item?.size,
      type: item?.mime_type,
    })),
  };
};
