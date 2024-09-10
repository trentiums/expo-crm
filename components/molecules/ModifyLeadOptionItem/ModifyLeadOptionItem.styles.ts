import Text from '@atoms/Text/Text';
import { styled } from '@utils/styled';
import { Pressable, View } from 'react-native';

export const OptionLabel = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.englishHolly};
`;

export const IconContainer = styled(View)`
  display: flex;
`;

export const ItemContainer = styled(Pressable)`
  flex-direction: row;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
`;
