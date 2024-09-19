import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const LeadDetailCardContainer = styled(View)<{
  isActive?: boolean;
}>`
  border-radius: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 14px;
  padding-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.white};
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
