import { styled } from '@utils/styled';
import { FlatList, View, Pressable } from 'react-native';
import Text from '@atoms/Text/Text';

export const CreateOptionContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  flex: 1;
  padding-top: 15px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CreateOptionsFlatList = styled(FlatList).attrs({
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})``;

export const LeadsSortFilterText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.englishHolly};
`;
export const LeadsFilterContainer = styled(Pressable)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;
export const LeasFilterScreenContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.white};
  padding-top: 16px;
`;
export const LeadsFilterButton = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: 16px;
`;
