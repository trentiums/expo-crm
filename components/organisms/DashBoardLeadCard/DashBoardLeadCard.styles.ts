import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const LeadDetailCardContainer = styled(View)<{
  isActive?: boolean;
  isServices?: boolean;
}>`
  border-radius: 16px;
  padding-left: ${({ isServices }) => (isServices ? 0 : 16)}px;
  padding-right: ${({ isServices }) => (isServices ? 0 : 16)}px;
  padding-top: ${({ isServices }) => (isServices ? 0 : 14)}px;
  padding-bottom: 16px;
  background-color: ${({ theme, isServices }) =>
    isServices ? undefined : theme.colors.white};
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
