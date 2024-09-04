import { PaddingSpace, Spacer } from '@atoms/common/common.styles';
import { useAppTheme } from '@constants/theme';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import UserInformationForm from '@organisms/UserInformationForm/UserInformationForm';
import { UserInformationFormValues } from '@organisms/UserInformationForm/UserInformationForm.props';
import {
  addUserAction,
  getAssignUserListAction,
  getUserListAction,
} from '@redux/actions/user';
import { useAppDispatch } from '@redux/store';
import FormTemplate from '@templates/FormTemplate/FormTemplate';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';

const addUser = () => {
  const toast = useToast();
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation('screenTitle');
  const [loading, setLoading] = useState(false);
  const onUserInformationSubmitPress = async (
    values: UserInformationFormValues,
  ) => {
    try {
      setLoading(true);
      const response = await dispatch(
        addUserAction({
          email: values?.email,
          name: values?.name,
          password: values?.password,
        }),
      ).unwrap();

      await dispatch(getUserListAction({}));
      await dispatch(getAssignUserListAction());
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });
      router.navigate('/users');
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
  useEffect(() => {
    navigation.setOptions({
      title: t('addUser'),
      headerStyle: {
        backgroundColor: colors.tabBar,
      },
      headerTintColor: colors.white,
    });
  }, [navigation]);
  return (
    <ScreenTemplate>
      <PaddingSpace>
        <Spacer size={16} />
        <FormTemplate
          Component={UserInformationForm}
          loading={loading}
          onSubmit={onUserInformationSubmitPress}
          isSave
        />
        <Spacer size={32} />
      </PaddingSpace>
    </ScreenTemplate>
  );
};

export default addUser;
