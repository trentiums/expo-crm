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
import { useTranslation } from 'react-i18next';
import { generateWhatsAppUrl } from '@utils/common';
import WhatsApp from '@atoms/Illustrations/WhatsApp';
import { LeadDetailsProps } from './LeadDetail.props';
import ActionMenu from '@molecules/ActionMenu/ActionMenu';
import { router } from 'expo-router';
import Trash from '@atoms/Illustrations/Trash';
import { useAppTheme } from '@constants/theme';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import ActionModal from '@molecules/ActionModal/ActionModal';
import EmailSendBox from '@atoms/Illustrations/EmailBox';
import PhoneIcon from '@atoms/Illustrations/PhoneIcon';
import { RootState, useSelector } from '@redux/store';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useToast } from 'react-native-toast-notifications';
import moment from 'moment';
import { dateTimeFormate } from '@constants/common';
import { Flexed } from '@atoms/common/common.styles';
import { Linking } from 'react-native';
import LeadStatus from '@molecules/LeadStatus/LeadStatus';

const LeadDetail: React.FC<LeadDetailsProps> = ({
  leadData,
  onEdit,
  onDelete,
  isDeleteLoading,
  showModal,
  setShowModal,
  isServices,
  setDeleteId,
  isShowSocialMedia,
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
    generateWhatsAppUrl(phoneNumber);
  };
  const onEditLead = () => {
    if (onEdit) {
      onEdit();
    } else {
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

  const hideActionModal = () => {
    setShowModal(false);
  };

  return (
    <DetailContainer>
      <LeadInfoView isServices={isServices}>
        {/* {isServices ? <ProductServices /> : <UserProfile />} */}
        <Flexed>
          <NameAndStatusContainer>
            <NameText numberOfLines={1} isServices={isServices}>
              {leadData?.name}
            </NameText>
            <LeadStatus
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
        </Flexed>
        <ActionMenu
          onEdit={onEditLead}
          onDelete={(id) => onDeleteLead(id)}
          id={leadData?.leadId || leadData?.id}
        />
      </LeadInfoView>
      {isShowSocialMedia && (
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
          onBackdropPress={hideActionModal}
          heading={tm('discardMedia')}
          description={tm('disCardDescription')}
          label={tm('yesDiscard')}
          actionType={Actions.delete}
          actiontext={tm('cancel')}
          onCancelPress={hideActionModal}
          onActionPress={() => handleDeleteLead()}
          icon={<Trash color={colors?.deleteColor} />}
          loading={isDeleteLoading}
        />
      )}
    </DetailContainer>
  );
};

export default LeadDetail;
