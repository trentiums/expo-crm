import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { TextInput } from 'react-native-paper';

export const LabelText = styled(Text)`
  font-size: 14px;
  display: flex;
  align-items: flex-end;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.black};
`;

export const RNPTextInput = styled(TextInput)`
  background-color: ${({ theme }) => theme.colors.transparent};
`;
export const InputErrorContainer = styled(View)<{ isError?: boolean }>`
  border-width: ${({ isError }) => (isError ? 1 : 0)}px;
  border-color: ${({ isError, theme }) =>
    isError ? theme.colors.errorText : undefined};
  border-radius: 8px;
`;
