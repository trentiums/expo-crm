import React, { useState } from 'react';
import { Field, useFormState } from 'react-final-form';
import {
  BottomContainer,
  ButtonSubmit,
  FormButtonText,
  Label,
  ViewMainContainer,
} from './ChangePasswordForm.styles';
import { useTranslation } from 'react-i18next';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import {
  complexPasswordValidator,
  composeValidators,
  confirmPasswordValidator,
  minLengthValidator,
  requiredValidator,
} from '@utils/formValidators';
import { Flexed, Spacer } from '@atoms/common/common.styles';
import { useAppTheme } from '@constants/theme';
import { ChangePasswordFormProps } from './ChangePasswordForm.props';
import LockIcon from '@atoms/Illustrations/Lock';
import { Pressable } from 'react-native';
import EyeCloseIcon from '@atoms/Illustrations/EyeClose';
import EyeOpenIcon from '@atoms/Illustrations/EyeOpen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  loading,
  form,
}) => {
  const { colors } = useAppTheme();
  const { t } = useTranslation('changePassword');
  const { valid } = useFormState({ subscription: { valid: true } });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);
  const [secureOldTextEntry, setSecureOldTextEntry] = useState(true);

  const handleChangePassword = () => {
    if (!loading) {
      form.submit();
    }
  };

  return (
    <ViewMainContainer>
      <Flexed>
        <KeyboardAwareScrollView>
          <Spacer size={16} />
          <Label>{`${t('oldPassword')} *`}</Label>
          <Field
            name="oldPassword"
            placeholder={t('oldPassword')}
            component={FieldTextInput}
            validate={composeValidators(
              requiredValidator,
              minLengthValidator,
              complexPasswordValidator,
            )}
            left={() => <LockIcon color={colors.gray} />}
            password={() => (
              <Pressable
                onPress={() => setSecureOldTextEntry(!secureOldTextEntry)}>
                {secureOldTextEntry ? <EyeCloseIcon /> : <EyeOpenIcon />}
              </Pressable>
            )}
            right
            secureTextEntry={secureOldTextEntry}
          />
          <Spacer size={16} />
          <Label>{`${t('password')} *`}</Label>
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
          <Spacer size={16} />
          <Label>{`${t('confirmPassword')} *`}</Label>
          <Field
            name="confirmPassword"
            placeholder={t('confirmPassword')}
            component={FieldTextInput}
            validate={composeValidators(
              requiredValidator,
              minLengthValidator,
              complexPasswordValidator,
              confirmPasswordValidator,
            )}
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
        </KeyboardAwareScrollView>
      </Flexed>
      <BottomContainer>
        <ButtonSubmit
          onPress={handleChangePassword}
          loading={loading}
          variant={valid}>
          <FormButtonText variant={valid}>{t('save')}</FormButtonText>
        </ButtonSubmit>
      </BottomContainer>
    </ViewMainContainer>
  );
};

export default ChangePasswordForm;
