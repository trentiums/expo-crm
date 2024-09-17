import React, { useState } from 'react';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChangePasswordContainer } from './changePassword.style';
import { useAppDispatch } from '@redux/store';
import FormTemplate from '@templates/FormTemplate/FormTemplate';
import ChangePasswordForm from '@organisms/ChangePasswordForm/ChangePasswordForm';
import { useToast } from 'react-native-toast-notifications';
import { ChangePasswordFormValues } from '@organisms/ChangePasswordForm/ChangePasswordForm.props';
import { changePasswordAction } from '@redux/actions/user';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { router } from 'expo-router';

const ChangePassword = () => {
  const { t } = useTranslation('changePassword');
  const { top } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const onChangePasswordSubmit = async (values: ChangePasswordFormValues) => {
    try {
      setLoading(true);
      const response = await dispatch(
        changePasswordAction({
          old_password: values?.oldPassword,
          password: values?.password,
          password_confirmation: values?.confirmPassword,
        }),
      ).unwrap();
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });
      router.navigate('/(protected)/more-menu/moreMenu');
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
    <ScreenTemplate title={t('changePassword')}>
      <ChangePasswordContainer spacing={top}>
        <FormTemplate
          Component={ChangePasswordForm}
          loading={loading}
          onSubmit={onChangePasswordSubmit}
        />
      </ChangePasswordContainer>
    </ScreenTemplate>
  );
};

export default ChangePassword;
