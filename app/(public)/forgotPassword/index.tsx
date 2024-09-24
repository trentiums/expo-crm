import React, { useState } from 'react';
import images from '@assets/images';
import FormTemplate from '@templates/FormTemplate/FormTemplate';
import ForgotPasswordForm from '@organisms/ForgotPasswordForm/ForgotPasswordForm';
import { ForgotPasswordFormValues } from '@organisms/ForgotPasswordForm/ForgotPasswordForm.props';
import { useTranslation } from 'react-i18next';
import {
  Container,
  ForgotFormContainer,
  ForgotScreenContainer,
  ForgotScrollView,
  ForgotText,
  ImageView,
} from './forgotPassword.styles';
import { useAppDispatch } from '@redux/store';
import { forgotPasswordAction } from '@redux/actions/auth';
import { useToast } from 'react-native-toast-notifications';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { router } from 'expo-router';
import { SafeAreaContainer } from '@templates/ScreenTemplate/ScreenTemplate.styles';

const index = () => {
  const { t } = useTranslation('login');
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const onForgotPress = async (values: ForgotPasswordFormValues) => {
    try {
      setLoading(true);
      const response = await dispatch(
        forgotPasswordAction({ email: values.email }),
      ).unwrap();
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });
      router.navigate('/(public)/login');
    } catch (error) {
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
    <SafeAreaContainer>
      <ForgotScrollView keyboardShouldPersistTaps="always">
        <ForgotScreenContainer>
          <Container>
            <ImageView source={images.loginImage} resizeMode="cover" />
          </Container>
          <ForgotFormContainer>
            <ForgotText variant="SF-Pro-Display-Semibold_600">
              {t('forgotPasswordTitle')}
            </ForgotText>
            <FormTemplate
              Component={ForgotPasswordForm}
              onSubmit={(values) => onForgotPress(values)}
              loading={loading}
            />
          </ForgotFormContainer>
        </ForgotScreenContainer>
      </ForgotScrollView>
    </SafeAreaContainer>
  );
};

export default index;
