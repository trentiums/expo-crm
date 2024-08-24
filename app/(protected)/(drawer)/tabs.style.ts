import Text from "@atoms/Text/Text";
import View from "@atoms/View/View";
import { styled } from "@utils/styled";
import { StyleSheet, Platform, FlatList, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const styles = StyleSheet.create({
  badgeStyle: {
    marginTop: 10,
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
  barStyle: {
    paddingTop: 16,
  },
});
export const DashboardScreenContainer = styled(ScrollView)`
  padding: 16px;
`;
export const TitleText = styled(Text)`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;
export const NoDataFoundText = styled(Text)`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.placeholderTextColor};
`;
export const FlatListCon = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingTop: 16,
    paddingBottom: 48,
  },
})``;

export const ModalFormContainer = styled(View)`
  flex: 1;
  justify-content: center;
`;

export const CrossIconView = styled(Pressable)`
  display: flex;
  align-items: flex-end;
`;
export const LoaderView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const NoLeadsFoundContainer = styled(View)`
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export const AddLeadContainer = styled(View)`
  padding: 16px;
  flex: 1;
`;
