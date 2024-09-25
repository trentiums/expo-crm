import { styled } from '@utils/styled';
import { Pressable, View } from 'react-native';

export const Container = styled(Pressable)`
  background-color: ${({ theme }) => theme.colors.datePickerBg};
  border-radius: 10px;
`;

export const OutSide = styled(Pressable)`
  height: 100%;
`;
