import React, { useCallback, useState } from 'react';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import DealCloseWinForm from '@organisms/DealCloseWinForm/DealCloseWinForm';
import { DealWinCloseFormValues } from '@organisms/DealCloseWinForm/DealCloseWinForm.props';
import { LeadStageType } from '@organisms/LeadDetailCard/LeadDetailCard.props';
import { getLeadDetailsAction, updateLeadAction } from '@redux/actions/lead';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import FormTemplate from '@templates/FormTemplate/FormTemplate';
import { useToast } from 'react-native-toast-notifications';
import { LeadStageChangeProps } from './screen.props';
import { BottomSheetListContainer } from './screen.style';
import { getLeadStagePreparedDataForCLoseWonType } from '@utils/functions';
import {
  dashboardLeadListAction,
  dashboardLeadStageCountAction,
} from '@redux/actions/dashboard';

const LeadStageCloseWon: React.FC<LeadStageChangeProps> = ({
  changeSnapPoints,
  handleBottomSheetClose,
  route,
}) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const slug = route.params;

  const countryList = useSelector(
    (state: RootState) => state.general.countryList,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const [loading, setLoading] = useState(false);
  const leadConversionId = slug?.leadConversionId;
  const leadId = +slug?.leadId;

  const onLayout = useCallback(() => {
    changeSnapPoints(['90%', '90%']);
  }, []);

  const handleSaveLeadsStatusChange = async (values: any) => {
    try {
      leadConversionId;
      setLoading(true);
      let formData = await getLeadStagePreparedDataForCLoseWonType(
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
        Component={DealCloseWinForm}
        loading={loading}
        onSubmit={(values: DealWinCloseFormValues) => {
          handleSaveLeadsStatusChange(values);
        }}
        onCancelPress={() => handleBottomSheetClose?.()}
        isDealClose={leadConversionId === LeadStageType.CLOSELOST}
        leadCardId={leadId}
      />
    </BottomSheetListContainer>
  );
};

export default LeadStageCloseWon;
