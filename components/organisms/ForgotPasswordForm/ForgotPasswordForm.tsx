import EmailIcon from '@atoms/Illustrations/Email';
import { useAppTheme } from '@constants/theme';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import {
  ButtonSubmit,
  ForgotFormView,
  ForgotPasswordContainer,
  ForgotText,
  LoginFormContainer,
  LoginFormView,
} from '@organisms/LoginForm/LoginForm.styles';
import {
  composeValidators,
  emailValidator,
  minLengthValidator,
  requiredValidator,
} from '@utils/formValidators';
import React from 'react';
import { Field, useFormState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { ForgotPasswordFormProps } from './ForgotPasswordForm.props';
import { FormButtonText } from '@organisms/BasicInformationForm/BasicInformationForm.styles';
import { Spacer } from '@atoms/common/common.styles';
import { router } from 'expo-router';

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  form,
  loading,
}) => {
  const { t } = useTranslation('login');
  const { colors } = useAppTheme();
  const { valid } = useFormState({ subscription: { valid: true } });
  return (
    <ForgotFormView>
      <LoginFormContainer>
        <Field
          name="email"
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
      </LoginFormContainer>
      <ForgotPasswordContainer
        onPress={() => router.navigate('/(public)/login')}>
        <ForgotText>{t('backToLogin')}</ForgotText>
      </ForgotPasswordContainer>
      <Spacer size={16} />

      <ButtonSubmit
        onPress={!loading && form.submit}
        loading={loading}
        textColor={valid ? colors.black : colors.disabledTextColor}
        variant={valid}>
        <FormButtonText valid={valid}>{t('sendEmail')}</FormButtonText>
      </ButtonSubmit>
    </ForgotFormView>
  );
};

export default ForgotPasswordForm;
