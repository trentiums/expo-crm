import React from "react";
import {
  DateTimeText,
  DetailContainer,
  EmailView,
  NameContainer,
  NameText,
  NumberEmailView,
  NumberView,
  PressAbleContainer,
  SubNameText,
  TextView,
  TitleView,
  WhatsAppIcon,
  WhatsAppIconView,
} from "./LeadDetail.styles";
import { Linking, Pressable } from "react-native";
import { Spacer } from "@atoms/common/common.styles";
import { useTranslation } from "react-i18next";
import PhoneIcon from "@atoms/Illustrations/PhoneIcon";
import MailIcon from "@atoms/Illustrations/MailIcon";
import View from "@atoms/View/View";
import { callToAction } from "@utils/common";
import WhatsApp from "@atoms/Illustrations/WhatsApp";
import { ToastTypeProps } from "@molecules/Toast/Toast.props";
import { useToast } from "react-native-toast-notifications";
import { telLink, whatsAppLink } from "@utils/config";
import { LeadDetailsProps } from "./LeadDetail.props";
import * as Clipboard from "expo-clipboard";

const LeadDetail: React.FC<LeadDetailsProps> = ({
  phoneNumber,
  whatsAppNumber,
  mailID,
  title,
  dateTime,
}) => {
  const { t } = useTranslation("errorMessage");
  const toast = useToast();
  const handleWhatsApp = (phoneNumber: number | string) => {
    Linking.canOpenURL(whatsAppLink + phoneNumber)
      .then((supported) => {
        if (supported) {
          callToAction(whatsAppLink + phoneNumber);
        } else {
          callToAction(
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              "Join WhatsApp using this link: https://whatsapp.com/dl/"
            )}`
          );
        }
      })
      .catch((err) => {
        console.error("An error occurred", err);
      });
  };

  return (
    <DetailContainer>
      <NameContainer>
        <TitleView>
          <View>
            <NameText numberOfLines={1}>{title}</NameText>
            <DateTimeText>{dateTime}</DateTimeText>
          </View>
        </TitleView>
        <WhatsAppIconView isShow={whatsAppNumber}>
          {whatsAppNumber && (
            <WhatsAppIcon
              onPress={() => {
                handleWhatsApp(`${whatsAppNumber}`);
              }}>
              <WhatsApp />
            </WhatsAppIcon>
          )}
        </WhatsAppIconView>
        <NumberEmailView isFull={!whatsAppNumber}>
          {phoneNumber && (
            <NumberView>
              <PressAbleContainer
                onPress={() => {
                  callToAction(`${telLink}${phoneNumber}`);
                }}>
                <View>
                  <Spacer size={3} />
                  <PhoneIcon />
                </View>
                <TextView isFull={!mailID}>
                  <SubNameText numberOfLines={1}>{phoneNumber}</SubNameText>
                </TextView>
              </PressAbleContainer>
              <Spacer size={8} />
            </NumberView>
          )}
          {mailID && (
            <EmailView>
              <PressAbleContainer
                onPress={() => {
                  Clipboard.setStringAsync(mailID);
                  toast.show(t("copyText"), {
                    type: "customToast",
                    data: {
                      type: ToastTypeProps.Copy,
                    },
                  });
                }}>
                <View>
                  <Spacer size={2} />
                  <MailIcon />
                </View>
                <TextView isFull={!phoneNumber}>
                  <SubNameText numberOfLines={1}>{mailID}</SubNameText>
                </TextView>
              </PressAbleContainer>
            </EmailView>
          )}
        </NumberEmailView>
      </NameContainer>
    </DetailContainer>
  );
};

export default LeadDetail;
