import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const LeadDetailCardContainer = styled(View)<{
  isActive?: boolean;
}>`
  padding: 16px 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.lightBorder};
`;
export const RequirementClubContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
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
