import Button from "@atoms/Button/Button";
import Text from "@atoms/Text/Text";
import View from "@atoms/View/View";
import { styled } from "@utils/styled";
import { Pressable } from "react-native";

export const LeadsFilterFormContainer = styled(View)`
  padding: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
export const DateFilterContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 16px;
`;
export const DateContainer = styled(View)`
  width: 48%;
`;
export const ApplyFiltersContainer = styled(Button)`
  width: 100%;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primaryColor};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.bgColor};
`;
export const FilterBtnText = styled(Text)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryColor};
  text-align: center;
`;
export const FilterFormView = styled(View)`
  flex: 1;
`;
export const FiltersDropDownViews = styled(View)`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
export const RemoveFiltersContainer = styled(Button)`
  width: 100%;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.errorText};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.bgColor};
`;
export const RemoveFilterBtnText = styled(Text)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.errorText};
  text-align: center;
`;
