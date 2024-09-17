import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { StyleSheet, FlatList, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const styles = StyleSheet.create({
  badgeStyle: {
    marginTop: 10,
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
  barStyle: {
    paddingTop: 16,
    minHeight: 60,
    paddingBottom: 8,
  },
  barLabelStyle: {
    fontSize: 12,
    marginTop: 4,
  },
});
export const DashboardScreenContainer = styled(KeyboardAwareScrollView)`
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
export const ProductsFlatList = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingTop: 0,
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
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const NoLeadsFoundContainer = styled(View)`
  justify-content: center;
  align-items: center;
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
  color: ${({ theme }) => theme.colors.blueChaos};
  font-weight: 600;
`;

export const CreateOptionTabContainer = styled(Pressable)`
  align-items: center;
  justify-content: center;
  top: -4px;
`;

export const TabLabel = styled(Text)<{ focused?: boolean }>`
  margin-top: 5px;
  font-size: 12px;
  font-weight: ${({ focused }) => (focused ? 'bold' : 'lighter')};
  color: ${({ focused, theme }) =>
    focused ? theme.colors.englishHolly : theme.colors.laurelGarland};
`;

export const HeadingView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
export const HeadingText = styled(Text)`
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.englishHolly};
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
export const DashboardFilterView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const DividerContainer = styled(View)`
  flex: 0.8;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.aria};
`;
export const LeadsFlatList = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingBottom: 60,
  },
})``;
