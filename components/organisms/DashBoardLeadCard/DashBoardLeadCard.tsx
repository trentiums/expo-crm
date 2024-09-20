import React, { useState } from 'react';
import { LeadDetailCardContainer } from './DashBoardLeadCard.styles';
import { Spacer } from '@atoms/common/common.styles';
import { DashBoardLeadCardProps } from './DashBoardLeadCard.props';
import LeadDetail from '@molecules/LeadDetail/LeadDetail';
import { router } from 'expo-router';
import { useAppDispatch } from '@redux/store';
import { deleteLeadAction } from '@redux/actions/lead';
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import {
  dashboardLeadListAction,
  dashboardLeadStageCountAction,
} from '@redux/actions/dashboard';

const DashBoardLeadCard: React.FC<DashBoardLeadCardProps> = ({
  leadData,
  isSocialMediaVisible,
}) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleDeleteLead = async () => {
    try {
      setDeleteLoading(true);
      const response = await dispatch(
        deleteLeadAction({ lead_id: leadData?.id }),
      ).unwrap();
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });
      await dispatch(dashboardLeadListAction({}));
      await dispatch(dashboardLeadStageCountAction());
    } catch (error: any) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setDeleteLoading(false);
  };
  return (
    <>
      <LeadDetailCardContainer isActive={false}>
        <LeadDetail
          leadData={leadData}
          onEdit={() =>
            router.navigate(`/(protected)/add-lead/${leadData?.id}`)
          }
          onDelete={handleDeleteLead}
          loading={deleteLoading}
          onChangeModalState={(value) => setShowModal(value)}
          showModal={showModal}
          isSocialMediaVisible={isSocialMediaVisible}
        />
      </LeadDetailCardContainer>
      <Spacer size={16} />
    </>
  );
};

export default DashBoardLeadCard;
