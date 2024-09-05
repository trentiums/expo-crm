import React from 'react';
import {
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
  handlePhoneCall,
} from '@utils/common';
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
import ProductServices from '@atoms/Illustrations/ProductService';
import { RootState, useSelector } from '@redux/store';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useToast } from 'react-native-toast-notifications';
import moment from 'moment';
import { dateTimeFormate } from '@constants/common';
import { Flexed } from '@atoms/common/common.styles';
import LeadStatus from '@molecules/LeadStatus/LeadStatus';

const LeadDetail: React.FC<LeadDetailsProps> = ({
  leadData,
  onEdit,
  onDelete,
  isDeleteLoading,
  showModal,
  setShowModal,
  setDeleteId,
  showSocialMedia,
}) => {
  const { t } = useTranslation('leadDetailCardDetails');
  const { t: tm } = useTranslation('modalText');
  const toast = useToast();
  const { colors } = useAppTheme();
  const leads = useSelector((state: RootState) => state.leads.leadList.leads);

  const handleWhatsApp = (phoneNumber: number | string) => {
    generateWhatsAppUrl(phoneNumber);
  };
  const onEditLead = () => {
    if (onEdit) {
      onEdit();
    } else {
      if (leadData?.id) {
        router.navigate(`/(protected)/add-lead/${leadData.id}`);
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
  const hideActionModal = () => {
    setShowModal(false);
  };
  const onDeleteLead = (id: number) => {
    setShowModal(true);
    setDeleteId?.(id);
  };
  const handleDeleteLead = async () => {
    onDelete();
  };

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
        <ActionMenu
          onEdit={onEditLead}
          onDelete={(id) => onDeleteLead(id)}
          id={leadData?.leadId || leadData?.id}
        />
      </LeadInfoView>
      {showSocialMedia && (
        <ContactBox>
          {leadData?.email && (
            <CommunicationOptionCon onPress={() => handleEmail(leadData.email)}>
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
    </DetailContainer>
  );
};

export default LeadDetail;
