import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import styled from 'styled-components';

export const LeadSelectContainer = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  height: auto;
`;

export const SelectTitleText = styled(Text)<{ isStart?: boolean }>`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 700;
  text-align: ${({ isStart }) => (isStart ? 'start' : 'center')};
`;

export const LeadSelectSubContainer = styled(View)`
  display: flex;
  flex: 0.33;
  height: fit-content;
`;

export const SwipeText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;
