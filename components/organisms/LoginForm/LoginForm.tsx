import React, { useState } from 'react';
import { Field, useFormState } from 'react-final-form';
import { LoginFormProps } from './LoginForm.props';

import {
  ButtonSubmit,
  ForgotPasswordContainer,
  ForgotText,
  LoginFormContainer,
  LoginFormView,
} from './LoginForm.styles';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@constants/theme';
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
  minLengthValidator,
  requiredValidator,
} from '@utils/formValidators';
import { Spacer } from '@atoms/common/common.styles';
import { FormButtonText } from '@organisms/BasicInformationForm/BasicInformationForm.styles';
import { router } from 'expo-router';

const LoginForm: React.FC<LoginFormProps> = ({ form, loading }) => {
  const { t } = useTranslation('login');
  const { colors } = useAppTheme();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { valid } = useFormState({ subscription: { valid: true } });

  return (
    <LoginFormView>
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
          left={() => <EmailIcon color={colors.gray} />}
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
          left={() => <LockIcon color={colors.gray} />}
          password={() => (
            <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
              {secureTextEntry ? <EyeCloseIcon /> : <EyeOpenIcon />}
            </Pressable>
          )}
          right
          secureTextEntry={secureTextEntry}
        />
        <ForgotPasswordContainer
          onPress={() => router.navigate('/(public)/forgotPassword')}>
          <ForgotText>{t('forgotPassword')}</ForgotText>
        </ForgotPasswordContainer>
        <Spacer size={16} />
      </LoginFormContainer>

      <ButtonSubmit
        onPress={form.submit}
        loading={loading}
        textColor={valid ? colors.black : colors.disabledTextColor}
        valid={valid}>
        <FormButtonText valid={valid}>{t('login')}</FormButtonText>
      </ButtonSubmit>
    </LoginFormView>
  );
};

export default LoginForm;
