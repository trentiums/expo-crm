import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';

export const LeadStageContainer = styled(View)<{ bgColor?: string }>`
  background-color: ${({ theme, bgColor }) =>
    bgColor || theme.colors.lightBlue};
  width: fit-content;
  border-radius: 16px;
`;

export const LeadStageText = styled(Text)<{ color?: string }>`
  font-size: 14px;
  color: ${({ theme, color }) => color || theme.colors.blue};
  padding: 4px 8px;
`;
