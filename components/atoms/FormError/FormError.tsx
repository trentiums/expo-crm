import React from 'react';
import { HelperText } from 'react-native-paper';
import { FormErrorProps } from './FormError.props';
import { useTranslation } from 'react-i18next';

const FormError = ({ visible, errorId, text, compact }: FormErrorProps) => {
  if (compact && !visible) {
    return null;
  }
  const { t } = useTranslation('errors');
  return (
    <HelperText type={'error'} visible={visible} padding="none">
      {errorId ? t(errorId) : text || ''}
    </HelperText>
  );
};

export default FormError;
