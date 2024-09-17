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
import { getLeadStatusPreparedData } from '@utils/functions';
import {
  dashboardLeadListAction,
  dashboardLeadStageCountAction,
} from '@redux/actions/dashboard';

const LeadStatusChange: React.FC<LeadStatusChangeProps> = ({
  changeSnapPoints,
  handleBottomSheetClose,
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
    try {
      setLoading(true);
      let formData = await getLeadStatusPreparedData(
        values,
        leadsDetail,
        leadId,
        leadStatusId,
        countryList,
        documents,
      );
      const response = await dispatch(updateLeadAction(formData)).unwrap();
      await dispatch(getLeadDetailsAction({ lead_id: leadId }));
      dispatch(dashboardLeadListAction({}));
      dispatch(dashboardLeadStageCountAction());
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
    handleBottomSheetClose?.();
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
        onCancelPress={() => handleBottomSheetClose?.()}
      />
    </BottomSheetListContainer>
  );
};

export default LeadStatusChange;
