import React, { useCallback, useState } from 'react';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { DealWinCloseFormValues } from '@organisms/DealCloseWinForm/DealCloseWinForm.props';
import LeadProposalNegotiationForm from '@organisms/LeadProposolNagotioationForm/LeadProposolNagotioationForm';
import { getLeadDetailsAction, updateLeadAction } from '@redux/actions/lead';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import FormTemplate from '@templates/FormTemplate/FormTemplate';
import { useToast } from 'react-native-toast-notifications';
import { BottomSheetListContainer } from './screen.style';
import { LeadStageChangeProps } from './screen.props';
import { getLeadStageNegotiationData } from '@utils/functions';
import {
  dashboardLeadListAction,
  dashboardLeadStageCountAction,
} from '@redux/actions/dashboard';

const LeadStageNegotiation: React.FC<LeadStageChangeProps> = ({
  changeSnapPoints,
  handleBottomSheetClose,
  route,
}) => {
  const countryList = useSelector(
    (state: RootState) => state.general.countryList,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const slug = route.params;
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const leadConversionId = slug?.leadConversionId;
  const leadId = +slug?.leadId;

  const onLayout = useCallback(() => {
    changeSnapPoints(['90%', '90%']);
  }, []);

  const handleSaveLeadsStatusChange = async (values: any) => {
    try {
      setLoading(true);
      let formData = await getLeadStageNegotiationData(
        values,
        leadsDetail,
        leadId,
        leadConversionId,
        countryList,
      );
      const response = await dispatch(updateLeadAction(formData)).unwrap();
      await dispatch(getLeadDetailsAction({ lead_id: leadId }));
      dispatch(dashboardLeadListAction({}));
      dispatch(dashboardLeadStageCountAction());
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
    handleBottomSheetClose?.();
  };

  return (
    <BottomSheetListContainer onLayout={onLayout}>
      <FormTemplate
        Component={LeadProposalNegotiationForm}
        loading={loading}
        onSubmit={(values: DealWinCloseFormValues) => {
          handleSaveLeadsStatusChange(values);
        }}
        onCancelPress={() => handleBottomSheetClose?.()}
        leadCardId={leadId}
      />
    </BottomSheetListContainer>
  );
};

export default LeadStageNegotiation;
