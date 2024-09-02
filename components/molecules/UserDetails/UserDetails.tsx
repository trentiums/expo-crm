import React from 'react';
import {
  DateTimeText,
  DetailContainer,
  ImageContainer,
  LeadImage,
  NameContainer,
  NameText,
  NumberView,
  PressAbleContainer,
  SubNameText,
} from './UserDetails.styles';
import { Pressable } from 'react-native';
import { Spacer } from '@atoms/common/common.styles';
import { UserDetailsProps } from './UserDetails.props';
import { useTranslation } from 'react-i18next';
import PhoneIcon from '@atoms/Illustrations/PhoneIcon';
import MailIcon from '@atoms/Illustrations/MailIcon';
import View from '@atoms/View/View';
import { callToAction, compressString } from '@utils/common';
import WhatsAppIcon from '@atoms/Illustrations/WhatsApp';
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useToast } from 'react-native-toast-notifications';
import { telLink, whatsAppLink } from '@utils/config';

const UserDetails: React.FC<UserDetailsProps> = ({
  phoneNumber,
  whatsAppNumber,
  mailID,
  cardImage,
  title,
  dateTime,
}) => {
  const { t } = useTranslation('errorMessage');
  const toast = useToast();

  return (
    <DetailContainer>
      <ImageContainer>
        <LeadImage source={cardImage}></LeadImage>
      </ImageContainer>
      <NameContainer>
        <View>
          <NameText>{compressString(title, 21)}</NameText>
          <DateTimeText>{dateTime}</DateTimeText>
        </View>
        <View>
          <NumberView>
            <PressAbleContainer
              onPress={() => {
                callToAction(`${telLink}${phoneNumber}`);
              }}>
              <View>
                <Spacer size={3} />
                <PhoneIcon />
              </View>
              <SubNameText>{phoneNumber}</SubNameText>
            </PressAbleContainer>
            <Spacer size={8} />
            <Pressable
              onPress={() => {
                callToAction(`${whatsAppLink}${whatsAppNumber}`);
              }}>
              <WhatsAppIcon />
            </Pressable>
          </NumberView>
          <Spacer size={5} />
          <NumberView>
            <PressAbleContainer
              onPress={() => {
                Clipboard.setString(mailID);
                toast.show(t('copyText'), {
                  type: 'customToast',
                  data: {
                    type: ToastTypeProps.Copy,
                  },
                });
              }}>
              <View>
                <Spacer size={2} />
                <MailIcon />
              </View>
              <View>
                <SubNameText>{compressString(mailID, 30)}</SubNameText>
              </View>
            </PressAbleContainer>
          </NumberView>
        </View>
      </NameContainer>
    </DetailContainer>
  );
};

export default UserDetails;
