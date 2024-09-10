import React, { useState } from 'react';
import {
  ActionMenuIcon,
  ContactBox,
  DateTimeText,
  DetailContainer,
  LeadInfoView,
  NameAndStatusContainer,
  NameText,
  CommunicationOptionCon,
} from './LeadDetail.styles';
import { useTranslation } from 'react-i18next';
import {
  generateWhatsAppUrl,
  handleEmail,
  handleOpenDialCall,
  handlePhoneCall,
} from '@utils/common';
import WhatsApp from '@atoms/Illustrations/WhatsApp';
import { LeadDetailsProps } from './LeadDetail.props';
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
import LeadStatus from '@molecules/LeadStatus/LeadStatus';
import LeadInfoCard from '@molecules/LeadInfoCard/LeadInfoCard';
import BottomSheetNavigator from '@organisms/bottom-sheet-Navigator/bottomSheetNavigator';

const LeadDetail: React.FC<LeadDetailsProps> = ({
  leadData,
  onEdit,
  onDelete,
  isDeleteLoading,
  showModal,
  onChangeModalState,
  onChangeDeleteId,
  isSocialMediaVisible,
  isShowLeadInfo,
}) => {
  const { t } = useTranslation('leadDetailCardDetails');
  const { t: tm } = useTranslation('modalText');
  const toast = useToast();
  const { colors } = useAppTheme();
  const leads = useSelector((state: RootState) => state.leads.leadList.leads);
  const [visibleBottomSheet, setVisibleBottomSheet] = useState(false);

  const handleEmail = () => {
    const email = leadData?.email;
    if (email) {
      handleOpenEmail(email);
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
  const handleDeleteLead = async () => {
    onDelete(leadData?.leadId || leadData?.id);
  };
  const handlePhoneCall = (phoneNumber) => {
    try {
      handleOpenDialCall(phoneNumber);
    } catch (error) {
      toast.show(t('phoneNumberIsNotAvailable'), {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
  };

  const hideActionModal = () => {
    onChangeModalState(false);
  };

  const openBottomSheet = () => setVisibleBottomSheet(true);

  const closeBottomSheet = () => setVisibleBottomSheet(false);

  return (
    <DetailContainer>
      <LeadInfoView>
        <Flexed>
          <NameAndStatusContainer>
            <NameText numberOfLines={1}>{leadData?.name}</NameText>
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
        <ActionMenuIcon
          icon="dots-vertical"
          onPress={openBottomSheet}
          iconColor={colors.textDark}
        />
      </LeadInfoView>
      {isShowLeadInfo && <LeadInfoCard leadId={leadData.leadId} />}
      {isSocialMediaVisible && (
        <ContactBox>
          {leadData?.email && (
            <CommunicationOptionCon onPress={handleEmail}>
              <EmailSendBox />
            </CommunicationOptionCon>
          )}
          {leadData?.phone && (
            <CommunicationOptionCon
              onPress={() => handlePhoneCall(leadData.phone)}>
              <PhoneIcon />
            </CommunicationOptionCon>
          )}
          {leadData?.phone && (
            <CommunicationOptionCon
              onPress={() => handleWhatsApp(leadData.phone)}>
              <WhatsApp />
            </CommunicationOptionCon>
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
      {visibleBottomSheet && (
        <BottomSheetNavigator
          initialRouteName="ModifyLeadOption"
          onClosePress={closeBottomSheet}
          extraInfo={{ leadId: leadData?.id }}
        />
      )}
    </DetailContainer>
  );
};

export default LeadDetail;
