import Text from '@atoms/Text/Text';
import { styled } from '@utils/styled';
import { SafeAreaView } from 'react-native';

export const DrawerSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  margin-top: 32px;
`;
export const VersionText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
`;
