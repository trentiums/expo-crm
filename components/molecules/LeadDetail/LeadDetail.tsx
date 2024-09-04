import React from 'react';
import {
  ContactBox,
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
import { callToAction } from '@utils/common';
import WhatsApp from '@atoms/Illustrations/WhatsApp';
import { whatsAppLink } from '@utils/config';
import { LeadDetailsProps } from './LeadDetail.props';
import ActionMenu from '@molecules/ActionMenu/ActionMenu';
import { router } from 'expo-router';
import Trash from '@atoms/Illustrations/Trash';
import { useAppTheme } from '@constants/theme';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import ActionModal from '@molecules/ActionModal/ActionModal';
import { RootState, useSelector } from '@redux/store';
import LeadStatusShow from '@molecules/LeadStatusShow/LeadStatusShow';
import moment from 'moment';
import { dateTimeFormate } from '@constants/common';
import EmailSendBox from '@atoms/Illustrations/EmailBox';
import { useToast } from 'react-native-toast-notifications';
import { ToastTypeProps } from '@molecules/Toast/Toast.props';
import PhoneIcon from '@atoms/Illustrations/PhoneIcon';
import ProductServices from '@atoms/Illustrations/ProductService';

const LeadDetail: React.FC<LeadDetailsProps> = ({
  leadData,
  onEdit,
  onDelete,
  loading,
  showModal,
  setShowModal,
  isServices,
  setDeleteId,
  showSocialMedia,
}) => {
  const { t: tm } = useTranslation('modalText');
  const toast = useToast();
  const { colors } = useAppTheme();
  const leads = useSelector((state: RootState) => state.leads.leadList.leads);

  const handleEmail = () => {
    const email = leadData?.email;
    if (email) {
      const emailUrl = `mailto:${email}?subject=Your%20Subject%20Here&body=Your%20Message%20Here`;

      Linking.openURL(emailUrl).catch((err) => {
        toast.show(tm('emailOpenFailed'), {
          type: 'customToast',
          data: {
            type: ToastTypeProps.Error,
          },
        });
      });
    } else {
      toast.show(tm('emailNotAvailable'), {
        type: 'customToast',
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
  };

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
    if (onEdit) {
      onEdit();
    } else {
      router.navigate(`/(protected)/add-lead/${leadData?.leadId}`);
    }
  };
  const onDeleteLead = (id: number) => {
    setShowModal(true);
    setDeleteId?.(id);
  };
  const onDeleteActionPress = async () => {
    await handleDeleteLead();
  };
  const handleDeleteLead = async () => {
    onDelete(leadData?.leadId || leadData?.id);
  };
  const handlePhoneCall = (phoneNumber) => {
    if (phoneNumber) {
      const phoneUrl = `tel:${phoneNumber}`;
      Linking.openURL(phoneUrl).catch((err) => {
        console.error('Failed to open dialer', err);
      });
    }
  };

  return (
    <DetailContainer isServices={isServices}>
      <LeadInfoView isServices={isServices}>
        {isServices && <ProductServices />}
        <LeadDetailView>
          <NameAndStatusContainer>
            <NameText numberOfLines={1} isServices={isServices}>
              {leadData?.name}
            </NameText>
            <LeadStatusShow
              leadStatus={
                leads?.filter((item) => item?.id === leadData?.id)[0]
                  ?.leadStatusId
              }
            />
          </NameAndStatusContainer>
          {leadData?.createdAt && (
            <DateTimeText>
              {moment(leadData.createdAt).format(dateTimeFormate)}
            </DateTimeText>
          )}
        </LeadDetailView>
        <ActionMenu
          onEdit={onEditLead}
          onDelete={(id) => onDeleteLead(id)}
          id={leadData?.leadId || leadData?.id}
        />
      </LeadInfoView>
      {showSocialMedia && (
        <ContactBox>
          {leadData?.email && (
            <WhatsAppContainer onPress={handleEmail}>
              <EmailSendBox />
            </WhatsAppContainer>
          )}
          {leadData?.phone && (
            <WhatsAppContainer onPress={() => handlePhoneCall(leadData?.phone)}>
              <PhoneIcon />
            </WhatsAppContainer>
          )}
          {leadData?.phone && (
            <WhatsAppContainer onPress={() => handleWhatsApp(leadData?.phone)}>
              <WhatsApp />
            </WhatsAppContainer>
          )}
        </ContactBox>
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
          loading={loading}
        />
      )}
    </DetailContainer>
  );
};

export default LeadDetail;
