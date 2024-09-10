import { styled } from '@utils/styled';
import { FlatList, View, Pressable } from 'react-native';
import Text from '@atoms/Text/Text';
import { Image } from 'expo-image';

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
export const DropdownListingView = styled(View)`
  padding: 0px 16px;
`;
export const DropdownListingText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
`;
export const DropdownListView = styled(Pressable)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const DropDownImage = styled(Image)`
  height: 23px;
  width: 28px;
  border-radius: 4px;
`;
