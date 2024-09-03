import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const LeadDetailCardContainer = styled(View)<{
  isActive?: boolean;
  isServices?: boolean;
}>`
  border-radius: 16px;
  padding: 14px 16px 16px 16px;
  background-color: ${({ theme, isServices }) =>
    isServices ? undefined : theme.colors.white};
  border-bottom-width: ${({ isServices }) => (isServices ? 1 : 0)}px;
  border-bottom-color: ${({ isServices, theme }) =>
    isServices ? theme?.colors?.aria : undefined};
`;
export const RequirementClubContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TouchableOpacityContainer = styled(TouchableOpacity)<{
  backgroundColor?: string;
}>`
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? backgroundColor : theme.colors.transparent};
  padding: 10px;
  width: 80px;
  justify-content: center;
  align-content: center;
`;

export const SwipeText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;

export const ViewContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RenderRightView = styled(View)`
  flex-direction: row;
`;
