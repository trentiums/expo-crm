import React, { useState } from 'react';
import FormTemplate from '@templates/FormTemplate/FormTemplate';
import {
  Container,
  ImageView,
  IntroText,
  LoginFormContainer,
  LoginScreenContainer,
  LoginScrollView,
} from './LoginScreen.styles';
import { useTranslation } from 'react-i18next';
import LoginForm from '@organisms/LoginForm/LoginForm';
import images from '../../../assets/images/index';
import { LoginFormData } from './LoginScreen.props';
import { loginUserAction } from '@redux/actions/auth';
import { useAppDispatch } from '@redux/store';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useToast } from 'react-native-toast-notifications';
import {
  countryListAction,
  leadChannelListAction,
  leadConversionListAction,
  leadStatusListAction,
  settingsListAction,
} from '@redux/actions/general';
import { getProductServiceListAction } from '@redux/actions/productService';
import { router } from 'expo-router';
import { getLeadListAction } from '@redux/actions/lead';
import {
  getAssignUserListAction,
  getUserListAction,
} from '@redux/actions/user';

const LoginScreen = () => {
  const { t } = useTranslation('login');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const onLoginPress = async (values: LoginFormData) => {
    try {
      setLoading(true);
      const loginResponse = await dispatch(
        loginUserAction({
          email: values.username.trim(),
          password: values.password.trim(),
        }),
      ).unwrap();
      if (await loginResponse.status) {
        await Promise.all([
          dispatch(settingsListAction()),
          // dispatch(leadChannelListAction()),
          // dispatch(leadConversionListAction()),
          // dispatch(leadStatusListAction()),
          // dispatch(countryListAction()),
          // dispatch(getProductServiceListAction({})),
          // dispatch(getLeadListAction({})),
          // dispatch(getUserListAction({})),
          // dispatch(getAssignUserListAction()),
        ]);
      }
      router.replace('/(protected)/(tabs)/leads');
    } catch (error: any) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setLoading(false);
  };

  return (
    <LoginScrollView>
      <LoginScreenContainer>
        <Container>
          <ImageView source={images.loginImage} resizeMode="cover" />
        </Container>
        <LoginFormContainer>
          <IntroText>{t('welcomeBack')} 👋</IntroText>
          <FormTemplate
            Component={LoginForm}
            onSubmit={(values) => onLoginPress(values)}
            loading={loading}
          />
        </LoginFormContainer>
      </LoginScreenContainer>
    </LoginScrollView>
  );
};

export default LoginScreen;
