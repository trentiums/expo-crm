import Text from "@atoms/Text/Text";
import View from "@atoms/View/View";
import { styled } from "@utils/styled";
import { Dimensions, Image, TouchableOpacity } from "react-native";

export const DrawerNavigationView = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 16px;
  align-items: start;
`;

export const UserInfoSection = styled(View)`
  margin: 8px;
  padding: 8px;
  align-items: center;
  border-radius: 8px;
  flex: 1;
`;

export const UserImage = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 10px;
`;

export const DrawerItemSection = styled(View)`
  height: ${Dimensions.get("screen")?.height * 0.58}px;
`;

export const UserName = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;

export const DrawerBottomSection = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  flex: 1;
`;

export const LogoutText = styled(Text)`
  font-size: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.lightGreen};
`;

export const VersionNumberText = styled(Text)`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;

export const TouchableOpacityContainer = styled(TouchableOpacity)`
  margin-right: 15px;
`;

export const CompanyText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.transparent};
  text-align: center;
`;
