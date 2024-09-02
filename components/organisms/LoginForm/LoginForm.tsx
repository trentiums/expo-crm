import React, { useState } from 'react';
import { Field, useFormState } from 'react-final-form';
import { LoginFormProps } from './LoginForm.props';

import { ButtonSubmit, LoginFormContainer } from './LoginForm.styles';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@constants/theme';
import { RootState, useSelector } from '@redux/store';
import EmailIcon from '@atoms/Illustrations/Email';
import LockIcon from '@atoms/Illustrations/Lock';
import { Pressable } from 'react-native';
import EyeOpenIcon from '@atoms/Illustrations/EyeOpen';
import EyeCloseIcon from '@atoms/Illustrations/EyeClose';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import {
  complexPasswordValidator,
  composeValidators,
  emailValidator,
  lowercaseValidator,
  minLengthValidator,
  requiredValidator,
} from '@utils/formValidators';
import { Spacer } from '@atoms/common/common.styles';

const LoginForm: React.FC<LoginFormProps> = ({ form, loading }) => {
  const { t } = useTranslation('login');
  const { colors } = useAppTheme();
  const { user } = useSelector((state: RootState) => state?.auth);
  const [isActive, setIsActive] = useState(false);
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { valid } = useFormState({ subscription: { valid: true } });

  return (
    <>
      <LoginFormContainer>
        <Field
          name="username"
          placeholder={t('email')}
          component={FieldTextInput}
          keyboardType="email-address"
          validate={composeValidators(
            requiredValidator,
            minLengthValidator,
            emailValidator,
          )}
          left={() => (
            <EmailIcon color={isActive ? colors.primaryColor : colors.gray} />
          )}
        />
        <Spacer size={16} />
        <Field
          name="password"
          placeholder={t('password')}
          component={FieldTextInput}
          validate={composeValidators(
            requiredValidator,
            minLengthValidator,
            complexPasswordValidator,
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
      </LoginFormContainer>
      <LoginFormContainer></LoginFormContainer>

      <ButtonSubmit
        onPress={form.submit}
        loading={loading}
        textColor={valid ? colors.black : colors.disabledTextColor}
        valid={valid}
        disabled={!valid}>
        {t('login')}
      </ButtonSubmit>
    </>
  );
};

export default LoginForm;
