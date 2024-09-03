import React, { useState } from 'react';
import { LeadDetailCardContainer } from './DashBoardLeadCard.styles';
import { Spacer } from '@atoms/common/common.styles';
import { DashBoardLeadCardProps } from './DashBoardLeadCard.props';
import LeadDetail from '@molecules/LeadDetail/LeadDetail';
import { router } from 'expo-router';
import { useAppDispatch } from '@redux/store';
import { deleteLeadAction } from '@redux/actions/lead';
import { useToast } from 'react-native-toast-notifications';
import { ToastTypeProps } from '@molecules/Toast/Toast.props';
import { dashboardLeadListAction } from '@redux/actions/dashboard';

const DashBoardLeadCard: React.FC<DashBoardLeadCardProps> = ({
  leadData,
  showSocialMedia,
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
        type: 'customToast',
        data: {
          type: ToastTypeProps.Success,
        },
      });
      await dispatch(dashboardLeadListAction({ page: 1 }));
    } catch (error: any) {
      toast.show(error, {
        type: 'customToast',
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
          setShowModal={setShowModal}
          showModal={showModal}
          showSocialMedia={showSocialMedia}
        />
      </LeadDetailCardContainer>
      <Spacer size={16} />
    </>
  );
};

export default DashBoardLeadCard;
