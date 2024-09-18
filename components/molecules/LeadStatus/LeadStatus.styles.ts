import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';

export const LeadStatusContainer = styled(View)<{ bgColor?: string }>`
  background-color: ${({ theme, bgColor }) =>
    bgColor || theme.colors.lightBlue};
  width: fit-content;
  border-radius: 4px;
`;

export const LeadStatusText = styled(Text)<{ color?: string }>`
  font-size: 13px;
  color: ${({ theme, color }) => color || theme.colors.blue};
  padding: 1px 6px;
`;
