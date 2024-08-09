import Text from "@atoms/Text/Text";
import View from "@atoms/View/View";
import { styled } from "@utils/styled";
import { Dimensions, Image, Pressable, TouchableOpacity } from "react-native";

export const DrawerNavigationView = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 16px;
  align-items: start;
  flex: 1;
`;

export const UserInfoSection = styled(View)`
  margin: 8px;
  padding: 8px;
  align-items: center;
  border-radius: 8px;
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
  margin: 0px auto;
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
export const ProductCardView = styled(Pressable)`
  margin-left: 16px;
  margin-right: 16px;
`;
export const AddProductContainer = styled(View)`
  padding: 16px;
`;

export const FilterContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 16px;
  gap: 16px;
`;
export const FilterIconView = styled(Pressable)`
  width: 11%;
  padding: 12px 8px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  border-radius: 12px;
  position: relative;
`;
export const SearchInputContainer = styled(View)`
  width: 85%;
`;
export const FilterCountView = styled(View)`
  position: absolute;
  top: 0;
  left: 20;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2px 6px;
  z-index: -1;
  border-radius: 8px;
`;

export const FilterCountText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.black};
`;
