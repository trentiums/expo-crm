import React, { useState } from 'react';
import {
  ActionMenuIcon,
  ContactBox,
  DateTimeText,
  DetailContainer,
  LeadInfoView,
  NameAndStatusContainer,
  NameText,
  CommunicationOptionContainer,
} from './LeadDetail.styles';
import { useTranslation } from 'react-i18next';
import {
  generateWhatsAppUrl,
  handleOpenDialCall,
  handleOpenEmail,
} from '@utils/common';
import WhatsApp from '@atoms/Illustrations/WhatsApp';
import { LeadDetailsProps } from './LeadDetail.props';
import { useAppTheme } from '@constants/theme';
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
import { ScreenOptionType } from '@organisms/bottom-sheet-Navigator-Screen/screen.props';

const LeadDetail: React.FC<LeadDetailsProps> = ({
  leadData,
  isSocialMediaVisible,
  optionType,
  onDelete,
  editRoute,
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
            <CommunicationOptionContainer onPress={handleEmail}>
              <EmailSendBox />
            </CommunicationOptionContainer>
          )}
          {leadData?.phone && (
            <>
              <CommunicationOptionContainer
                onPress={() => handlePhoneCall(leadData.phone)}>
                <PhoneIcon />
              </CommunicationOptionContainer>
              <CommunicationOptionContainer
                onPress={() => handleWhatsApp(leadData.phone)}>
                <WhatsApp />
              </CommunicationOptionContainer>
            </>
          )}
        </ContactBox>
      )}

      {visibleBottomSheet && (
        <BottomSheetNavigator
          initialRouteName="ModifyLeadOption"
          onClosePress={closeBottomSheet}
          meta={{
            leadId: leadData?.id,
            optionType: optionType || ScreenOptionType.DASHBOARD,
            onDelete: onDelete,
            editRoute: editRoute,
          }}
        />
      )}
    </DetailContainer>
  );
};

export default LeadDetail;
