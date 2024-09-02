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
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import View from '@atoms/View/View';
import { callToAction } from '@utils/common';
import WhatsApp from '@atoms/Illustrations/WhatsApp';
import { whatsAppLink } from '@utils/config';
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
import { ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useToast } from 'react-native-toast-notifications';
import LeadStatusShow from '@molecules/LeadStatusShow/LeadStatusShow';
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
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleWhatsApp = (phoneNumber: number | string) => {
    Linking.canOpenURL(whatsAppLink + phoneNumber)
      .then((supported) => {
        if (supported) {
          callToAction(whatsAppLink + phoneNumber);
        } else {
          callToAction(
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              'Join WhatsApp using this link: https://whatsapp.com/dl/',
            )}`,
          );
        }
      })
      .catch((err) => {
        console.error('An error occurred', err);
      });
  };
  const onEditLead = () => {
    router.navigate(`/(protected)/add-lead/${leadData?.leadId}`);
  };
  const onDeleteLead = () => {
    setShowModal(true);
  };
  const onDeleteActionPress = async () => {
    await handleDeleteLead();
    setShowModal(false);
  };
  const handleDeleteLead = async () => {
    try {
      setDeleteLoading(true);
      const response = await dispatch(
        deleteLeadAction({ lead_id: leadData?.leadId }),
      ).unwrap();
      toast.show(response?.message, {
        type: 'customToast',
        data: {
          type: ToastTypeProps.Success,
        },
      });
    } catch (error: any) {
      toast.show(error, {
        type: 'customToast',
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setShowModal(false);
    setDeleteLoading(false);
  };
  return (
    <DetailContainer>
      <LeadInfoView>
        <UserProfile />
        <LeadDetailView>
          <NameAndStatusContainer>
            <NameText numberOfLines={1}>{leadData?.name}</NameText>
            <LeadStatusShow
              leadStatus={
                leads?.filter((item) => item?.id === leadData?.id)[0]
                  ?.leadStatusId
              }
            />
          </NameAndStatusContainer>

          <DateTimeText>
            {moment(leadData.createdAt).format(dateTimeFormate)}
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
          onBackdropPress={() => {
            setShowModal(false);
          }}
          heading={tm('discardMedia')}
          description={tm('disCardDescription')}
          label={tm('yesDiscard')}
          actionType={Actions.delete}
          actiontext={tm('cancel')}
          onCancelPress={() => {
            setShowModal(false);
          }}
          onActionPress={() => onDeleteActionPress()}
          icon={<Trash color={colors?.deleteColor} />}
          loading={deleteLoading}
        />
      )}
    </DetailContainer>
  );
};

export default LeadDetail;
