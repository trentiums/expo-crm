import Text from "@atoms/Text/Text";
import View from "@atoms/View/View";
import styled from "styled-components";

export const LeadSelectView = styled(View)`
  margin-top: -8px;
`;

export const LeadSelectContainer = styled(View)`
  display: flex;
  gap: 8px;
  flex-direction: row;
  padding: 0px 6px;
`;

export const SelectTitleText = styled(Text)<{ isStart?: boolean }>`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 4px;
`;

export const LeadSelectSubContainer = styled(View)`
  width: 49%;
`;

export const SwipeText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;
