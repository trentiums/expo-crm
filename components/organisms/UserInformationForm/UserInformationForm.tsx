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
  emailValidator,
  minLengthValidator,
  requiredValidator,
} from '@utils/formValidators';
import { Spacer } from '@atoms/common/common.styles';
import { useAppTheme } from '@constants/theme';
import { UserInformationFormProps } from './UserInformationForm.props';
import { useRoute } from '@react-navigation/native';
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
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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
        <Label>{`${t('firstNameLabel')} *`}</Label>
        <Field
          name="name"
          placeholder={t('firstNameLabel')}
          component={FieldTextInput}
          validate={requiredValidator}
        />
        <Spacer size={16} />
        <Label>{`${t('emailLabel')} *`}</Label>
        <Field
          name="email"
          placeholder={t('emailLabel')}
          component={FieldTextInput}
          keyboardType="email-address"
          validate={composeValidators(requiredValidator, emailValidator)}
        />
        <Spacer size={16} />
        <Label>{slug ? t('password') : `${t('password')} *`}</Label>

        <Field
          name="password"
          placeholder={t('password')}
          component={FieldTextInput}
          validate={composeValidators(
            ...(!slug ? [requiredValidator] : []),
            ...(!slug ? [minLengthValidator] : []),
            ...(!slug ? [complexPasswordValidator] : []),
          )}
          left={() => (
            <LockIcon
              color={isActivePassword ? colors.primaryColor : colors.gray}
            />
          )}
          password={() => (
            <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
              {secureTextEntry ? <EyeCloseIcon /> : <EyeOpenIcon />}
            </Pressable>
          )}
          right
          secureTextEntry={secureTextEntry}
        />

        <Spacer size={50} />
      </KeyboardAwareScrollViewContainer>
      <ButtonSubmit onPress={handleAddUser} loading={loading} valid={valid}>
        <FormButtonText valid={valid}>{tb('save')}</FormButtonText>
      </ButtonSubmit>
    </ViewMainContainer>
  );
};

export default UserInformationForm;
