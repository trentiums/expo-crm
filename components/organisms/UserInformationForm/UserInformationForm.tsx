import React, { useEffect, useState } from 'react';
import { Field, useFormState } from 'react-final-form';
import {
  ButtonSubmit,
  FormButtonText,
  KeyboardAwareScrollViewContainer,
  Label,
  ViewMainContainer,
} from './UserInformationForm.styles';
import { useTranslation } from 'react-i18next';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import {
  complexPasswordValidator,
  composeValidators,
  confirmPasswordValidator,
  emailValidator,
  minLengthValidator,
  requiredValidator,
} from '@utils/formValidators';
import { Spacer } from '@atoms/common/common.styles';
import { useAppTheme } from '@constants/theme';
import { UserInformationFormProps } from './UserInformationForm.props';
import LockIcon from '@atoms/Illustrations/Lock';
import { Pressable } from 'react-native';
import EyeCloseIcon from '@atoms/Illustrations/EyeClose';
import EyeOpenIcon from '@atoms/Illustrations/EyeOpen';
import { RootState, useSelector } from '@redux/store';
import { useLocalSearchParams } from 'expo-router';

const UserInformationForm: React.FC<UserInformationFormProps> = ({
  loading,
  form,
  isSave,
}) => {
  const params = useLocalSearchParams();
  const [slug] = useState(params?.slug);

  const { colors } = useAppTheme();
  const { t } = useTranslation('UserInformation');
  const { t: tb } = useTranslation('formButtonName');
  const { valid } = useFormState({ subscription: { valid: true } });
  const userList = useSelector((state: RootState) => state.user.userList.users);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);

  useEffect(() => {
    const user = userList?.filter((item) => item?.id === +slug)?.[0];
    if (slug) {
      form.change('name', user?.name);
      form.change('email', user?.email);
    }
  }, []);
  const handleAddUser = () => {
    if (!loading) {
      form.submit();
    }
  };

  return (
    <ViewMainContainer>
      <KeyboardAwareScrollViewContainer
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Spacer size={16} />
        <Label variant="SF-Pro-Display-Medium_500">{`${t(
          'firstNameLabel',
        )} *`}</Label>
        <Field
          name="name"
          placeholder={t('firstNameLabel')}
          component={FieldTextInput}
          validate={requiredValidator}
        />
        <Spacer size={16} />
        <Label variant="SF-Pro-Display-Medium_500">{`${t(
          'emailLabel',
        )} *`}</Label>
        <Field
          name="email"
          placeholder={t('emailLabel')}
          component={FieldTextInput}
          keyboardType="email-address"
          validate={composeValidators(requiredValidator, emailValidator)}
        />
        <Spacer size={16} />
        <Label variant="SF-Pro-Display-Medium_500">
          {slug ? t('password') : `${t('password')} *`}
        </Label>

        <Field
          name="password"
          placeholder={t('password')}
          component={FieldTextInput}
          validate={
            slug
              ? composeValidators(minLengthValidator, complexPasswordValidator)
              : composeValidators(
                  requiredValidator,
                  minLengthValidator,
                  complexPasswordValidator,
                )
          }
          left={() => <LockIcon color={colors.gray} />}
          password={() => (
            <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
              {secureTextEntry ? <EyeCloseIcon /> : <EyeOpenIcon />}
            </Pressable>
          )}
          right
          secureTextEntry={secureTextEntry}
        />
        <Spacer size={16} />
        <Label variant="SF-Pro-Display-Medium_500">{`${t(
          'confirmPassword',
        )}`}</Label>
        <Field
          name="confirmPassword"
          placeholder={t('confirmPassword')}
          component={FieldTextInput}
          validate={
            slug
              ? confirmPasswordValidator
              : composeValidators(
                  requiredValidator,
                  minLengthValidator,
                  complexPasswordValidator,
                  confirmPasswordValidator,
                )
          }
          left={() => <LockIcon color={colors.gray} />}
          password={() => (
            <Pressable
              onPress={() =>
                setSecureConfirmTextEntry(!secureConfirmTextEntry)
              }>
              {secureConfirmTextEntry ? <EyeCloseIcon /> : <EyeOpenIcon />}
            </Pressable>
          )}
          right
          secureTextEntry={secureConfirmTextEntry}
        />

        <Spacer size={50} />
      </KeyboardAwareScrollViewContainer>
      <ButtonSubmit onPress={handleAddUser} loading={loading} valid={valid}>
        <FormButtonText valid={valid} variant="SF-Pro-Display-Semibold_600">
          {tb('save')}
        </FormButtonText>
      </ButtonSubmit>
    </ViewMainContainer>
  );
};

export default UserInformationForm;
