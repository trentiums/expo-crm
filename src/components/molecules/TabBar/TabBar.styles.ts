import Text from '@atoms/Text/Text';
import { styled } from '@utils/styled';
import { Pressable, View } from 'react-native';

export const TabContainer = styled(View)<{
  size?: number;
  width?: number;
  radius?: number;
  tabBackColor?: string;
}>`
  flex-direction: row;
  height: ${({ size }) => size || 50}px;
  border-radius: ${({ radius }) => radius || 35}px;
  background-color: ${({ tabBackColor, theme }) =>
    tabBackColor || theme.colors.transparent};
`;

export const TabPress = styled(Pressable)<{
  activeTab?: string;
  selectTab?: string;
  borderColor?: string;
  tabBackColor?: string;
  radius?: number;
}>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  border-radius: ${({ activeTab, selectTab, radius }) =>
    activeTab === selectTab ? radius : 20}px;
  background-color: ${({ activeTab, selectTab, theme, tabBackColor }) =>
    activeTab === selectTab
      ? tabBackColor || theme.colors.white
      : theme.colors.inActiveTab};
`;

export const TabBarText = styled(Text)<{
  color?: string;
  activeTab: string;
  selectTab: string;
}>`
  font-size: 16px;
  text-align: center;
  color: ${({ activeTab, selectTab, theme, color }) =>
    activeTab === selectTab
      ? color || theme.colors.primaryColor
      : color || theme.colors.grayText};
`;
