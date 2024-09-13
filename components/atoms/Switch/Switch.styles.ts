import { styled } from '@utils/styled';
import { View } from 'react-native';

export const SwitchContainer = styled(View)<{ toggle: boolean }>`
  border-width: 1px;
  border-color: ${({ toggle, theme }) =>
    toggle === true ? 'none' : theme.colors.textColor};
  border-radius: 16px;
  width: 58px;
`;
