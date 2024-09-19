import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const LeadDetailCardContainer = styled(View)<{
  isActive?: boolean;
}>`
  padding: 16px 8px;
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
export const PhoneInfoView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
`;
export const EmailText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textDark};
`;
export const ActionMenuContainer = styled(View)`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
`;
