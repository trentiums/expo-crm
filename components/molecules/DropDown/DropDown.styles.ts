import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { FlatList, Pressable } from 'react-native';
import { Image } from 'expo-image';

export const DropDownContainer = styled(Pressable)``;

export const DropDownTitleText = styled(Text)`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;

  font-weight: bold;
`;

export const DropDownDataContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const DropdownLeftView = styled(View)<{
  isImage?: boolean;
  isFullWidth?: boolean;
}>`
  display: flex;
  flex-direction: row;
  margin-left: ${({ isImage }) => (isImage ? -10 : -20)}px;
  align-items: center;
  gap: 8px;

  width: ${({ isFullWidth }) => (isFullWidth ? 100 : 80)}%;
`;
export const PressableView = styled(Pressable)<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 4px;
  margin-bottom: 4px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.carolinaBlue : theme.colors.white};
  border-radius: 19px;
  border-width: 1px;
  border-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.carolinaBlue : theme.colors.lightGray};
`;

export const SelectedText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  text-align: 'center';
`;

export const DropDownSelectedView = styled(View)`
  width: 75%;
`;
export const DropDownDataView = styled(Pressable)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.transparent};
`;

export const DataText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray};
`;
export const ImageView = styled(Image)`
  height: 16px;
  width: 16px;
`;
export const PlaceHolderText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.moreThan};
`;
export const MultipleSelectedText = styled(Text)<{ isSelected: boolean }>`
  font-size: 16px;
  padding: 8px 12px;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.flyByNight : theme.colors.lightGray};
`;

export const ShowMultipleDataList = styled(FlatList).attrs({
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})``;
export const SearchFilterContainer = styled(Pressable)`
  position: relative;
`;
export const DropdownPlaceHolderText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.moreThan};
  position: absolute;
  left: 60;
  top: 17;
`;
