import Text from "@atoms/Text/Text";
import View from "@atoms/View/View";
import styled from "styled-components";

export const LeadSelectView = styled(View)`
  margin-top: -16px;
`;

export const LeadSelectContainer = styled(View)`
  display: flex;
  gap: 8px;
  flex-direction: row;
`;

export const SelectTitleText = styled(Text)<{ isStart?: boolean }>`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 4px;
`;

export const LeadSelectSubContainer = styled(View)`
  margin-top: 16px;
  width: 50%;
`;

export const SwipeText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;
