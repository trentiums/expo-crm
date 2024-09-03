import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import {
  View as RNView,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';

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
  height: ${Dimensions.get('screen')?.height * 0.58}px;
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
  padding: 16px 0px;
`;

export const FilterContainer = styled(View)`
  flex-direction: row;
  padding-bottom: 16px;
  margin-top: 16px;
  gap: 16px;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.lightBorder};
`;
export const FilterIconView = styled(Pressable)`
  width: 50px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
`;
export const SearchInputContainer = styled(RNView)`
  flex: 1;
`;
export const FilterCountView = styled(View)`
  position: absolute;
  top: 0;
  left: 30;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2px 6px;
  z-index: 1;
  border-radius: 8px;
`;

export const FilterCountText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.black};
`;
export const ActionBtnView = styled(View)`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
export const SeparatorComponent = styled(View)`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.lightBorder};
`;
