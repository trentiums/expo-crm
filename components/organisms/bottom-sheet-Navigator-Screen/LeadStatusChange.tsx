import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import LeadStatusChangeForm from '@organisms/LeadStatusChangeForm/LeadStatusChangeForm';
import { LeadStatusChangeFormValues } from '@organisms/LeadStatusChangeForm/LeadStatusChangeForm.props';
import { getLeadDetailsAction, updateLeadAction } from '@redux/actions/lead';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import FormTemplate from '@templates/FormTemplate/FormTemplate';
import React, { useCallback, useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { LeadStatusChangeProps } from './screen.props';
import { BottomSheetListContainer } from './screen.style';

const LeadStatusChange: React.FC<LeadStatusChangeProps> = ({
  changeSnapPoints,
  changeRoute,
  route,
}) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const countryList = useSelector(
    (state: RootState) => state.general.countryList,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const slug = route.params;
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const leadStatusId = slug?.leadStatusId;
  const leadId = +slug?.leadId;

  const onLayout = useCallback(() => {
    changeSnapPoints(['90%', '90%']);
  }, []);

  const handleSaveLeadsStatusChange = async (values: any) => {
    const data = leadsDetail;
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append('lead_id', `${leadId}`);
      if (data?.email) {
        formData.append('email', data?.email);
      }
      formData.append('lead_channel_id', `${data?.leadChannelId}`);
      formData.append('lead_conversion_id', `${data?.leadConversionId}`);
      formData.append('lead_status_id', `${leadStatusId}`);
      formData.append('name', data?.name);
      formData.append('product_services', data.productService);
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
      const response = await dispatch(updateLeadAction(formData)).unwrap();
      await dispatch(getLeadDetailsAction({ lead_id: leadId }));
      setDocuments([]);
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });
    } catch (error: any) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setLoading(false);
    changeRoute?.();
  };

  return (
    <BottomSheetListContainer onLayout={onLayout}>
      <FormTemplate
        Component={LeadStatusChangeForm}
        loading={loading}
        onSubmit={(values: LeadStatusChangeFormValues) => {
          handleSaveLeadsStatusChange(values);
        }}
        leadCardId={slug?.leadId}
        setDocuments={setDocuments}
        documents={documents}
        onCancelPress={() => changeRoute?.()}
      />
    </BottomSheetListContainer>
  );
};

export default LeadStatusChange;
