import React, { useRef, useState } from 'react';
import { LeadDetailCardContainer } from './LeadDetailCard.styles';
import LeadDetailsList from '@molecules/LeadDetailsList/LeadDetailsList';
import LeadSelect from '@molecules/LeadSelect/LeadSelect';
import {
  LeadDetailCardProps,
  LeadStageType,
  LeadStatusTypes,
} from './LeadDetailCard.props';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@constants/theme';
import { View } from 'react-native';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import { initialModalType } from '@utils/constant';
import LeadDetail from '@molecules/LeadDetail/LeadDetail';
import { getLeadDetailsAction, updateLeadAction } from '@redux/actions/lead';
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { router } from 'expo-router';
import { LeadSelectView } from '@molecules/LeadSelect/LeadSelect.styles';

const LeadDetailCard: React.FC<LeadDetailCardProps> = ({
  phoneNumber,
  channelList,
  leadList,
  StageList,
  onDelete,
  onEdit,
  LeadDetails,
  title,
  email,
  createdAt,
  setModal,
  modalType,
  setModalType,
  leadStatusId,
  leadChannelId,
  leadConversionId,
  leadCardId,
  currentId,
  leadId,
  assignedTo,
}) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList.leads,
  );
  const countryList = useSelector(
    (state: RootState) => state.general.countryList,
  );

  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);

  const handleChangeLead = (leadId: number, value: number) => {
    if (
      (value === LeadStatusTypes.CONTACTED ||
        value === LeadStatusTypes.QUALIFIED ||
        value === LeadStatusTypes.UNQUALIFIED) &&
      value !== leadStatusId
    ) {
      const slug = {
        leadId: leadId,
        leadStatusId: value,
      };
      value !== leadStatusId &&
        router.push({
          pathname: `/lead-status-change/${slug}`,
          params: slug,
        });
    } else {
      const data = leadsData?.filter((item) => item?.id === leadId)?.[0];
      if (leadStatusId !== value) {
        handleSaveLeadsStatusChange(
          data,
          leadCardId,
          data?.leadChannelId,
          value,
          data?.leadConversionId,
        );
      }
    }
  };

  const handleChangeChannelId = (leadId: number, value: number) => {
    const data = leadsData?.filter((item) => item?.id === leadId)?.[0];
    if (leadChannelId !== value) {
      handleSaveLeadsStatusChange(
        data,
        leadCardId,
        value,
        data?.leadStatusId,
        data?.leadConversionId,
      );
    }
  };

  const handleChangeLeadStage = (leadId: number, value: number) => {
    if (
      (value === LeadStageType.CLOSELOST || value === LeadStageType.CLOSEWON) &&
      value !== leadConversionId
    ) {
      const slug = { leadId: leadId, leadConversionId: value };
      router.push({
        pathname: `/(protected)/lead-close-won/${slug}`,
        params: slug,
      });
    } else if (
      value === LeadStageType?.NEGOTIATION &&
      leadConversionId !== value
    ) {
      const slug = {
        leadId: leadId,
        leadConversionId: value,
      };
      router.push({
        pathname: `/(protected)/lead-negotiation/${slug}`,
        params: slug,
      });
    } else {
      const data = leadsData?.filter((item) => item?.id === leadCardId)?.[0];
      if (leadConversionId !== value) {
        handleSaveLeadsStatusChange(
          data,
          leadCardId,
          data?.leadChannelId,
          data?.leadStatusId,
          value,
        );
      }
    }
  };

  const handleSaveLeadsStatusChange = async (
    values: any,
    currentLeadId: number,
    leadChannelId?: number,
    leadStageId?: number,
    leadConversionId?: number,
  ) => {
    const data = leadsData?.filter((item) => item?.id === currentLeadId)?.[0];
    const selectedDataServices = data.productService?.map((item) => item?.id);
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append('lead_id', currentLeadId || leadId);
      if (data?.email) {
        formData.append('email', data?.email);
      }
      formData.append(
        'lead_channel_id',
        leadChannelId || data?.leadChannelId || '',
      );
      formData.append(
        'lead_conversion_id',
        modalType?.closeWinLost || modalType?.negotiation
          ? currentId
          : leadConversionId || data?.leadConversionId,
      );
      formData.append(
        'lead_status_id',
        modalType?.leadChange ? currentId : leadStageId || data?.leadStatusId,
      );
      formData.append('name', data?.name);
      selectedDataServices.forEach((service, index) => {
        formData.append(`product_services[${index}]`, service);
      });
      formData.append(
        'company_name',
        values?.companyName || data?.companyName || '',
      );
      formData.append('budget', values?.budget || data?.budget || '');
      if (data?.companySize) {
        formData.append('company_size', data?.companySize);
      }

      formData.append(
        'company_website',
        values?.webSite || data?.webSite || '',
      );
      formData.append('time_line', values?.timeFrame || data?.timeLine || '');
      formData.append(
        'description',
        values?.description || values?.comments || data?.description || '',
      );
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
      if (data?.assignTo) {
        formData.append('assign_to_user_id', data?.assignTo);
      }
      if (documents?.length > 0) {
        documents.forEach((document, index) => {
          formData.append(`documents[${index}]`, {
            uri: document.uri,
            name: document.name,
            type: document.mimeType,
          });
        });
      }
      const response = await dispatch(updateLeadAction(formData)).unwrap();
      setDocuments([]);
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });
      await dispatch(
        getLeadDetailsAction({ lead_id: currentLeadId || leadId }),
      );
    } catch (error: any) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setLoading(false);
    setModalType(initialModalType);
    setModal(false);
  };
  const handleChangeAssignTo = async (leadId, value) => {
    const data = leadsData?.filter((item) => item?.id === +leadId)?.[0];
    const selectedDataServices = data.productService?.map((item) => item?.id);
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append('lead_id', leadId);
      if (data?.email) {
        formData.append('email', data?.email);
      }
      formData.append(
        'lead_channel_id',
        leadChannelId || data?.leadChannelId || '',
      );
      formData.append('lead_conversion_id', data?.leadConversionId);
      if (value) {
        formData.append('assign_to_user_id', value);
      }
      formData.append('lead_status_id', data?.leadStatusId);
      formData.append('name', data?.name);
      selectedDataServices.forEach((service, index) => {
        formData.append(`product_services[${index}]`, service);
      });
      formData.append('company_name', data?.companyName || '');
      formData.append('budget', data?.budget || '');
      if (data?.companySize) {
        formData.append('company_size', data?.companySize);
      }

      formData.append('company_website', data?.webSite || '');
      formData.append('time_line', data?.timeLine || '');
      formData.append('description', data?.description || '');
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
        formData.append('phone', data?.phone);
      }

      const response = await dispatch(updateLeadAction(formData)).unwrap();
      setDocuments([]);
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });

      await dispatch(getLeadDetailsAction({ lead_id: leadId }));
    } catch (error: any) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setLoading(false);
    setModalType(initialModalType);
    setModal(false);
  };

  return (
    <LeadDetailCardContainer isActive={false}>
      <LeadDetail
        leadData={{
          phone: phoneNumber,
          email: email,
          name: title,
          createdAt,
          leadId: leadId,
        }}
      />

      <View style={{ flex: 1 }}>
        <LeadDetailsList LeadDetails={LeadDetails} />
      </View>
      <LeadSelectView>
        <LeadSelect
          channelList={channelList}
          leadList={leadList}
          StageList={StageList}
          selectedChannel={leadChannelId}
          setSelectedChannel={(leadId, value) =>
            handleChangeChannelId(leadId, value)
          }
          selectedLead={leadStatusId}
          setSelectedLead={(leadId, value) => handleChangeLead(leadId, value)}
          selectedStage={leadConversionId}
          setSelectedStage={(leadId, value) =>
            handleChangeLeadStage(leadId, value)
          }
          leadCardId={leadCardId}
          assignedTo={assignedTo}
          setAssignTo={(leadId, value) => handleChangeAssignTo(leadId, value)}
        />
      </LeadSelectView>
    </LeadDetailCardContainer>
  );
};

export default LeadDetailCard;
