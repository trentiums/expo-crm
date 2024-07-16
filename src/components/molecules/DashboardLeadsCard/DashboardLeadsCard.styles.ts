import Text from '@atoms/Text/Text';
import { styled } from '@utils/styled';
import { View } from 'react-native';

export const DashboardLeadsCardContainer = styled(View)`
  padding: 16px 16px 10px 16px;
  background-color: ${({ theme }) => theme.colors.darkBackground};
  margin-bottom: 16px;
  border-radius: 4px;
  flex: 0.5;
`;

export const LeadsText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grayText};
`;

export const LeadsCountView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LeadIcon = styled(View)`
  width: 24px;
  height: 24px;
`;

export const LeadsCount = styled(Text)<{
  scoreColor: string;
}>`
  font-size: 32px;
  color: ${({ scoreColor, theme }) => scoreColor || theme.colors.white};
`;
