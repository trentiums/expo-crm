import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { StyleSheet, Platform, FlatList, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
  padding-bottom: 16px;
`;
export const TitleText = styled(Text)`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textDark};
`;
export const NoDataFoundText = styled(Text)`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.placeholderTextColor};
  max-width: 300px;
  margin: auto;
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
`;
export const GreetingText = styled(Text)`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 600;
`;
export const NameText = styled(Text)`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.BlueChaos};
  font-weight: 600;
`;

export const AddLeadTabContainer = styled(View)`
  align-items: center;
  justify-content: center;
  top: -4px;
`;

export const TabLabelText = styled(Text)<{ focused?: boolean }>`
  margin-top: 5px;
  font-size: 12px;
  font-weight: ${({ focused }) => (focused ? 'bold' : 'lighter')};
  color: ${({ focused, theme }) =>
    focused ? theme.colors.EnglishHolly : theme.colors.LaurelGarland};
`;

export const HeadingView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeadingText = styled(Text)`
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.EnglishHolly};
`;
export const CountsText = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textGray};
`;
export const FilterIconView = styled(Pressable)`
  width: 40px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 10;
  top: 0;
  bottom: 0;
  z-index: 1;
`;
