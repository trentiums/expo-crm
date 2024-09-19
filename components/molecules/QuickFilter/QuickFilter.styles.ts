import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { Pressable } from 'react-native';

export const QuickFilterContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const SelectedFilterWithIcon = styled(Pressable)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
export const FilterTitle = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textGray};
`;
export const FilterType = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textGray};
`;
