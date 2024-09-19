import Button from '@atoms/Button/Button';
import { styled } from '@utils/styled';
import { Pressable, View } from 'react-native';
import { Field } from 'react-final-form';
import Text from '@atoms/Text/Text';

export const LoginFormContainer = styled(View)`
  margin-top: 24px;
`;

export const LoginFormView = styled(View)`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

export const ButtonSubmit = styled(Button)<{ variant: boolean }>`
  height: 48px;
  justify-content: center;
  background-color: ${({ theme, variant }) =>
    variant ? theme.colors.blueChaos : theme.colors.gray};
  border-radius: 50px;
`;

export const PrivateKeyTextInput = styled(Field)`
  height: 150px;
  justify-content: 'flex-start';
`;
export const ForgotText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  padding-top: 4px;
`;

export const ForgotPasswordContainer = styled(Pressable)`
  align-self: flex-end;
`;

export const ForgotFormView = styled(View)`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;
