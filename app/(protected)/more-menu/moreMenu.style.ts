import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { FlatList } from 'react-native';

export const MainMenuContainer = styled(View)<{ spacing: number }>`
  background-color: ${({ theme }) => theme.colors.doctor};
  flex: 1;
  margin-top: 16px;
`;

export const SettingText = styled(Text)`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.laurelGarland};
`;

export const MenuOptionsFlatList = styled(FlatList).attrs({
  contentContainerStyle: {
    flexDirection: 'column',
  },
})``;

export const DividerContainer = styled(View)`
  border-color: ${({ theme }) => theme.colors.distantCloud};
  border-width: 0.8px;
`;

export const LanguageText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const DeleteText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.roseMadder};
  text-decoration-thickness: 4px;
`;
