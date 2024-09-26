import { styled } from '@utils/styled';
import { View } from 'react-native';

export const SwitchContainer = styled(View)<{ toggle: boolean }>`
  border-radius: 16px;
  width: 58px;
`;
