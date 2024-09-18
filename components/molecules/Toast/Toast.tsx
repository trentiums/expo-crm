import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import {
  CloseText,
  Container,
  IconContainer,
  MessageText,
  NotificationBox,
  NotificationContent,
  NotificationCopyContent,
} from './Toast.styles';
import { ToastTypeProps } from './Toast.props';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';
import ShadowBox from '@atoms/ShadowBox/ShadowBox';
import { Flexed, Spacer } from '@atoms/common/common.styles';
import { StatusCode } from '@type/api/api';
import { useTranslation } from 'react-i18next';

const ToastProviderContainer = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const { t } = useTranslation('toast');

  const NotificationRender = (
    renderType: ToastTypeProps,
    message: string | Element,
  ) => {
    switch (renderType) {
      case ToastTypeProps.Info:
        return (
          <NotificationContent>
            <MessageText>{message?.toString()}</MessageText>
          </NotificationContent>
        );
      case ToastTypeProps.Error:
        return (
          <NotificationContent>
            <Spacer size={8} />
            <MessageText>{message?.toString()}</MessageText>
          </NotificationContent>
        );
      case ToastTypeProps.Success:
        return (
          <NotificationContent>
            <Spacer size={8} />
            <MessageText>{message?.toString()}</MessageText>
          </NotificationContent>
        );
      case ToastTypeProps.Warning:
        return (
          <NotificationContent>
            <Spacer size={8} />
            <MessageText>{message?.toString()}</MessageText>
          </NotificationContent>
        );
      case ToastTypeProps.Copy:
        return (
          <NotificationCopyContent>
            <Spacer size={10} />
            <MessageText>{message?.toString()}</MessageText>
            <Spacer size={10} />
          </NotificationCopyContent>
        );
    }
  };
  const NotificationView = (toastInfo: ToastProps) => {
    if (
      toastInfo &&
      toastInfo?.message?.response?.status !== StatusCode.Unauthorized
    ) {
      return (
        <ShadowBox
          mode="bottom"
          style={{
            width: toastInfo.data.type !== ToastTypeProps.Copy ? 344 : 150,
          }}>
          <Container
            elevation={5}
            isError={toastInfo.data.type === ToastTypeProps.Error}>
            <NotificationBox>
              <Flexed>
                <NotificationBox>
                  {NotificationRender(toastInfo.data.type, toastInfo.message)}
                </NotificationBox>
              </Flexed>
              {toastInfo.data.type !== ToastTypeProps.Copy && (
                <IconContainer onPress={() => toastInfo.onHide()}>
                  <CloseText>{t('ok')}</CloseText>
                </IconContainer>
              )}
            </NotificationBox>
          </Container>
        </ShadowBox>
      );
    }
  };
  return (
    <ToastProvider
      placement="top"
      duration={3000}
      animationType="slide-in"
      animationDuration={250}
      textStyle={{ fontSize: 20 }}
      offset={50}
      offsetTop={30}
      offsetBottom={40}
      renderType={{
        customToast: (toast) => {
          return <>{NotificationView(toast)}</>;
        },
      }}
      swipeEnabled={true}>
      {children}
    </ToastProvider>
  );
};

export default ToastProviderContainer;
