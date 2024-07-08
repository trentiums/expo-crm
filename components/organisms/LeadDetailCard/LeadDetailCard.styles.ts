import Text from "@atoms/Text/Text";
import View from "@atoms/View/View";
import { styled } from "@utils/styled";
import { TouchableOpacity } from "react-native";
export const ModalFormContainer = styled(View)`
  flex: 1;
  justify-content: center;
`;

export const LeadDetailCardContainer = styled(View)<{
  isActive?: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.darkBackground};
  border-radius: 8px;
  padding: 16px 8px;
  border-width: 1px;
  border-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primaryColor : theme.colors.transparent};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.backgroundCardColor : theme.colors.transparent};
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
