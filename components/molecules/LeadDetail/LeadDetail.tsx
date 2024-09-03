import React, { useState } from 'react';
import {
  DateTimeText,
  DetailContainer,
  LeadDetailView,
  LeadInfoView,
  NameAndStatusContainer,
  NameText,
  WhatsAppContainer,
  WhatsAppText,
} from './LeadDetail.styles';
import { useTranslation } from 'react-i18next';
import { generateWhatsAppUrl } from '@utils/common';
import WhatsApp from '@atoms/Illustrations/WhatsApp';
import { LeadDetailsProps } from './LeadDetail.props';
import UserProfile from '@atoms/Illustrations/UserProfile';
import ActionMenu from '@molecules/ActionMenu/ActionMenu';
import { router } from 'expo-router';
import Trash from '@atoms/Illustrations/Trash';
import { useAppTheme } from '@constants/theme';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import ActionModal from '@molecules/ActionModal/ActionModal';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import { deleteLeadAction } from '@redux/actions/lead';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useToast } from 'react-native-toast-notifications';
import LeadStatus from '@molecules/LeadStatus/LeadStatus';
import moment from 'moment';
import { dateTimeFormate } from '@constants/common';

const LeadDetail: React.FC<LeadDetailsProps> = ({ leadData }) => {
  const { t } = useTranslation('leadDetailCardDetails');
  const { t: tm } = useTranslation('modalText');
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const leads = useSelector((state: RootState) => state.leads.leadList.leads);
  const [showModal, setShowModal] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleWhatsApp = (phoneNumber: number | string) => {
    generateWhatsAppUrl(phoneNumber);
  };
  const onEditLead = () => {
    if (leadData?.id) {
      router.navigate(`/(protected)/add-lead/${leadData?.id}`);
    } else {
      toast.show(t('canNotFindId'), {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
  };
  const onDeleteLead = () => {
    setShowModal(true);
  };
  const onDeleteActionPress = async () => {
    await handleDeleteLead();
  };
  const handleDeleteLead = async () => {
    try {
      setIsDeleteLoading(true);
      const response = await dispatch(
        deleteLeadAction({ lead_id: leadData?.leadId }),
      ).unwrap();
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
    hideActionModal();
    setIsDeleteLoading(false);
  };
  const hideActionModal = () => {
    setShowModal(false);
  };
  return (
    <DetailContainer>
      <LeadInfoView>
        <UserProfile />
        <LeadDetailView>
          <NameAndStatusContainer>
            <NameText numberOfLines={1}>{leadData?.name}</NameText>
            <LeadStatus
              leadStatus={
                leads?.filter((item) => item?.id === leadData?.id)[0]
                  ?.leadStatusId
              }
            />
          </NameAndStatusContainer>

          <DateTimeText>
            {moment(leadData?.createdAt).format(dateTimeFormate)}
          </DateTimeText>
        </LeadDetailView>
        <ActionMenu onEdit={onEditLead} onDelete={onDeleteLead} />
      </LeadInfoView>
      {leadData?.phone && (
        <WhatsAppContainer onPress={handleWhatsApp}>
          <WhatsApp />
          <WhatsAppText>{t('whatsapp')}</WhatsAppText>
        </WhatsAppContainer>
      )}
      {showModal && (
        <ActionModal
          isModal={showModal}
          onBackdropPress={hideActionModal}
          heading={tm('discardMedia')}
          description={tm('disCardDescription')}
          label={tm('yesDiscard')}
          actionType={Actions.delete}
          actiontext={tm('cancel')}
          onCancelPress={hideActionModal}
          onActionPress={() => onDeleteActionPress()}
          icon={<Trash color={colors?.deleteColor} />}
          loading={isDeleteLoading}
        />
      )}
    </DetailContainer>
  );
};

export default LeadDetail;
