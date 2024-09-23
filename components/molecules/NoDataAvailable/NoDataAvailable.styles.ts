import Text from '@atoms/Text/Text';
import { styled } from '@utils/styled';
import { Image, View } from 'react-native';

export const NoDataContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: auto;
  flex: 1;
`;

export const NoDataImage = styled(Image)`
  width: 240px;
  height: 240px;
`;

export const NoDataText = styled(Text)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.twilightZone};
  font-weight: 600;
`;
export const NoDataDesc = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.namaraGrey};
`;
