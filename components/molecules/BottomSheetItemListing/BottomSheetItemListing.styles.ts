import Text from '@atoms/Text/Text';
import { styled } from '@utils/styled';
import { Pressable, View } from 'react-native';

export const OptionLabel = styled(Text)`
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: ${({ theme }) => theme.colors.englishHolly};
`;

export const ItemContainer = styled(Pressable)`
  flex-direction: row;
  align-items: center;
`;

export const OptionLabelContainer = styled(View)`
  flex-direction: row;
  flex: 1;
`;
export const IconWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
