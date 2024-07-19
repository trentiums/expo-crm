import Button from '@atoms/Button/Button';
import { styled } from '@utils/styled';
import { View } from 'react-native';
import { Field } from 'react-final-form';

export const LoginFormContainer = styled(View)`
  margin-top: 36px;
`;

export const ButtonSubmit = styled(Button)<{ valid: boolean }>`
  margin-top: 40px;
  height: 48px;
  justify-content: center;
  background-color: ${({ valid, theme }) =>
    valid ? theme.colors.primaryColor : theme.colors.transparent};
`;

export const PrivateKeyTextInput = styled(Field)`
  height: 150px;
  justify-content: 'flex-start';
`;
