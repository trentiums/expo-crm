import View from '@atoms/View/View';
import { styled } from '@utils/styled';

export const LeadInfoCardContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.zhuBaiPearl};
  padding: 16px;
  border-radius: 10px;
`;
export const LeadInfoContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
export const LeadInfoTitle = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const LeadInfoValue = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textDark};
`;
