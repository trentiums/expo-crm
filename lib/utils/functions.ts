import { MediaDocumentType } from '@organisms/bottom-sheet-Navigator-Screen/screen.props';
import { LeadStageType } from '@organisms/LeadDetailCard/LeadDetailCard.props';
import { LeadListState } from '@type/api/lead';
import { CountryListType } from '@type/redux/slices/general';
import moment from 'moment';

export const fileToApiSupportFile = (file: any) => {
  let imageContent: any;
  if (file) {
    let fileName = file?.fileName;
    let fileType: string = 'png';
    if (!fileName && file.uri) {
      const nameArr = file.uri?.split('.');
      fileType = nameArr && nameArr[nameArr.length - 1];
      fileName = `${moment()
        .format('YYYY-MM-DDHH:mm:ss')
        .toString()}.${fileType}`;
    }
    imageContent = {
      uri: file.uri,
      name: fileName,
      type: `image/${fileType}`,
    };
  }

  return imageContent;
};

export const getLeadStatusPreparedData = async (
  values: any,
  leadsDetail: LeadListState,
  leadId: number,
  leadStatusId: number,
  countryList: CountryListType[],
  documents: MediaDocumentType[],
) => {
  const data = leadsDetail;
  const selectedDataServices = data.productService?.map((item) => item?.id);
  let formData = new FormData();
  formData.append('lead_id', `${leadId}`);
  if (data?.email) {
    formData.append('email', data?.email);
  }
  formData.append('lead_channel_id', `${data?.leadChannelId}`);
  formData.append('lead_conversion_id', `${data?.leadConversionId}`);
  formData.append('lead_status_id', `${leadStatusId}`);
  formData.append('name', data?.name);
  selectedDataServices.forEach((service, index) => {
    formData.append(`product_services[${index}]`, service);
  });

  formData.append('company_name', values?.companyName || '');
  if (values?.budget) {
    formData.append('budget', values?.budget);
  }
  if (data?.companySize) {
    formData.append('company_size', data?.companySize);
  }
  if (data?.assignTo) {
    formData.append('assign_to_user_id', `${data?.assignTo}`);
  }
  formData.append('company_website', values?.webSite || '');
  formData.append('time_line', values?.timeFrame || '');
  formData.append('description', values?.comments || '');
  if (values?.dealAmount || data?.dealAmount) {
    formData.append('deal_amount', values?.dealAmount || data?.dealAmount);
  }
  if (data?.dealCloseDate) {
    formData.append('deal_close_date', data?.dealCloseDate);
  }
  formData.append(
    'win_close_reason',
    values?.reason || data?.winCloseReason || '',
  );
  const countryCodeAlpha = countryList?.filter(
    (item) => item?.id === data?.countryId,
  )?.[0]?.countryCodeAlpha;
  if (countryCodeAlpha && data?.phone) {
    formData.append('country_code_alpha', countryCodeAlpha);
    formData.append('phone', values?.phoneNumber || data?.phone);
  }
  const newDocumentsArray = documents?.filter((item) => !item.id);
  if (newDocumentsArray?.length > 0) {
    newDocumentsArray.forEach((document, index) => {
      formData.append(`documents[${index}]`, {
        uri: document.uri,
        name: document.name,
        type: document.mimeType,
      });
    });
  }
  return formData;
};

export const getLeadStagePreparedDataForCLoseWonType = async (
  values: any,
  leadsDetail: LeadListState,
  leadId: number,
  leadConversionId: number,
  countryList: CountryListType[],
) => {
  const data = leadsDetail;
  const selectedDataServices = data.productService?.map((item) => item?.id);
  let formData = new FormData();
  formData.append('lead_id', `${leadId}`);
  if (data?.email) {
    formData.append('email', data?.email);
  }
  formData.append('lead_channel_id', `${data?.leadChannelId}`);
  formData.append('lead_conversion_id', `${leadConversionId}`);
  formData.append('lead_status_id', `${data?.leadStatusId}`);
  formData.append('name', data?.name);
  selectedDataServices.forEach((service, index) => {
    formData.append(`product_services[${index}]`, service);
  });
  formData.append('company_name', data?.companyName || '');
  formData.append('budget', data?.budget || '');
  if (data?.companySize) {
    formData.append('company_size', data?.companySize);
  }

  formData.append('company_website', values?.webSite || data?.webSite || '');
  formData.append('time_line', data?.timeLine || '');
  formData.append(
    'description',
    leadConversionId !== LeadStageType.CLOSELOST
      ? values?.description || ''
      : data.description || '',
  );
  if (data?.assignTo) {
    formData.append('assign_to_user_id', `${data?.assignTo}`);
  }
  if (values?.dealAmount) {
    formData.append('deal_amount', values?.dealAmount);
  }
  if (data?.dealCloseDate) {
    formData.append('deal_close_date', data?.dealCloseDate);
  }
  formData.append('win_close_reason', values?.reason || '');
  const countryCodeAlpha = countryList?.filter(
    (item) => item?.id === data?.countryId,
  )?.[0]?.countryCodeAlpha;
  if (countryCodeAlpha && data?.phone) {
    formData.append('country_code_alpha', countryCodeAlpha);
    formData.append('phone', values?.phoneNumber || data?.phone);
  }
  return formData;
};

export const getLeadStageNegotiationData = async (
  values: any,
  leadsDetail: LeadListState,
  leadId: number,
  leadConversionId: number,
  countryList: CountryListType[],
) => {
  const data = leadsDetail;
  const selectedDataServices = data.productService?.map((item) => item?.id);
  let formData = new FormData();
  formData.append('lead_id', `${leadId}`);
  if (data?.email) {
    formData.append('email', data?.email);
  }
  formData.append('lead_channel_id', `${data?.leadChannelId || ''}`);
  formData.append('lead_conversion_id', `${leadConversionId}`);
  formData.append('lead_status_id', `${data?.leadStatusId}`);
  formData.append('name', data?.name);
  selectedDataServices.forEach((service, index) => {
    formData.append(`product_services[${index}]`, service);
  });
  formData.append('company_name', data?.companyName || '');
  formData.append('budget', data?.budget || '');
  if (data?.companySize) {
    formData.append('company_size', data?.companySize);
  }
  if (data?.assignTo) {
    formData.append('assign_to_user_id', `${data?.assignTo}`);
  }
  formData.append('company_website', data?.webSite || '');
  formData.append('time_line', data?.timeLine || '');
  formData.append('description', values?.description || '');
  if (data?.dealAmount) {
    formData.append('deal_amount', data?.dealAmount);
  }
  if (data?.dealCloseDate) {
    formData.append('deal_close_date', data?.dealCloseDate);
  }
  formData.append('win_close_reason', data?.winCloseReason || '');
  const countryCodeAlpha = countryList?.filter(
    (item) => item?.id === data?.countryId,
  )?.[0]?.countryCodeAlpha;
  if (countryCodeAlpha && data?.phone) {
    formData.append('country_code_alpha', countryCodeAlpha);
    formData.append('phone', `${data?.phone}`);
  }
  return formData;
};
