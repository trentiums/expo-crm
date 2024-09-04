import Text from '@atoms/Text/Text';
import { styled } from '@utils/styled';
import { Pressable, View } from 'react-native';

export const LabelText = styled(Text)`
  font-size: 14px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.englishHolly};
`;

export const IconContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.boysenberryShadow};
  padding: 16px 24px 16px 24px;
  border-radius: 52px;
  min-width: 104px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const ItemContainer = styled(Pressable)`
  align-items: center;
`;
