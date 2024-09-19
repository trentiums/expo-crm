import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { FlatList } from 'react-native-gesture-handler';

export const CompanyDashboardCardContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.dugong};
  border-radius: 16px;
  padding: 16px;
`;
export const UserInformationContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
  align-items: center;
`;
export const UserNameText = styled(Text)`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textDark};
`;
export const LeadsStatusDetailContainer = styled(View)`
  border-radius: 10px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.zhuBaiPearl};
  border-radius: 10px;
`;
export const LeadsCountContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
export const LeadCount = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textDark};
`;
export const LeadTitle = styled(Text)<{ bgColor?: string; color?: string }>`
  background-color: ${({ bgColor, theme }) =>
    bgColor || theme.colors.zhuBaiPearl};
  color: ${({ theme, color }) => color || theme.colors.textDark};
  font-size: 16px;
  border-radius: 100px;
  padding: 4px 12px;
`;
export const LeadFlatListCon = styled(FlatList).attrs({
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
  },
})``;
export const TotalLeadsCountContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.aria};
  padding-bottom: 12px;
`;
export const TotalLeadTitle = styled(Text)`
  background-color: ${({ theme }) => theme.colors.zhuBaiPearl};
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 16px;
  border-radius: 100px;
`;
