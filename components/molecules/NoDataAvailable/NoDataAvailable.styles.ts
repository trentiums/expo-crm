import Text from '@atoms/Text/Text';
import { styled } from '@utils/styled';
import { Image, View } from 'react-native';

export const NoDataContainer = styled(View)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-basis: auto;
`;

export const NoDataImage = styled(Image)`
  width: 240px;
  height: 240px;
`;

export const NoDataText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray};
`;
