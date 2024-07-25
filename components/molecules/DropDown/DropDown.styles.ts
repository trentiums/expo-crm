import Text from "@atoms/Text/Text";
import View from "@atoms/View/View";
import { styled } from "@utils/styled";
import { Pressable } from "react-native";
import { Image } from "expo-image";

export const DropDownContainer = styled(View)`
  flex: 1;
`;

export const DropDownTitleText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 16px;
`;

export const DropDownDataContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const DropdownLeftView = styled(View)<{ isImage?: boolean }>`
  display: flex;
  flex-direction: row;
  margin-left: ${({ isImage }) => (isImage ? 4 : -20)}px;
  align-items: center;
  gap: 8px;
`;
export const PressableView = styled(Pressable)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.transparent};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.disabledTextColor};
  padding: 14px 8px;
  border-radius: 4px;
`;
export const SelectedText = styled(Text)`
  font-size: 16px;
`;
export const DropDownDataView = styled(Pressable)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray};
  background-color: ${({ theme }) => theme.colors.transparent};
  margin: 0px 16px;
  border-radius: 8px;
`;

export const DataText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
  padding-left: 8px;
`;
export const ImageView = styled(Image)`
  height: 16px;
  width: 16px;
`;
export const PlaceHolderText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.disabledTextColor};
`;
export const MultipleSelectedText = styled(Text)`
  background-color: ${({ theme }) => theme.colors.transparent};
  font-size: 16px;
  margin-right: 4px;
  padding: 4px 16px 6px 16px;
  border-radius: 16px;
`;
