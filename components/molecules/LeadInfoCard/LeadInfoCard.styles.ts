import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { FlatList } from 'react-native';

export const LeadInfoCardContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.snowflake};
  padding: 16px;
  border-radius: 10px;
`;
export const LeadInfoContainer = styled(View)<{ isItemsStarts: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: ${({ isItemsStarts }) =>
    isItemsStarts ? 'flex-start' : 'center'};
  margin-bottom: 12px;
`;
export const LeadInfoTitle = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textGray};
  padding-left: 6px;
`;

export const LeadInfoValue = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textDark};
  padding-left: 6px;
`;
export const LeadAssignedToContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.plaster};
  padding: 2px 8px 4px 8px;
  border-radius: 15px;
`;
export const LeadServicesText = styled(Text)`
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.plaster};
  padding: 2px 8px;
  border-radius: 15px;
  color: ${({ theme }) => theme.colors.textDark};
  flex: 1;
  width: fit-content;
  align-self: flex-start;
`;
export const ServiceListContainer = styled(FlatList).attrs({
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})`
  display: flex;
  flex-direction: row;
  gap: 4px;
  flex-wrap: wrap;
  flex: 1;
  flex-basis: auto;
`;
