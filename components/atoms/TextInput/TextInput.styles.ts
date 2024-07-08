import Text from '@atoms/Text/Text';
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
