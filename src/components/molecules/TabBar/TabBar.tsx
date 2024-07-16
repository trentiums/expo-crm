import React from "react";
import { TabBarProps } from "./TabBar.props";
import { TabBarText, TabContainer, TabPress } from "./TabBar.styles";
import { useAppTheme } from "@constants/theme";

const TabBar: React.FC<TabBarProps> = ({
  tab,
  selectedTab,
  color,
  tabSize,
  tabBackgroundColor,
  selectedTabColor,
  tabWidth,
  radius,
  onTabChange,
  selectedActiveTab,
  setSelectedTabNav,
  isTabChange,
}) => {
  const { colors } = useAppTheme();
  const handleTabChange = (tab: string, index: number) => {
    setSelectedTabNav(tab);
    selectedTab(tab);
    onTabChange?.(index);
  };
  const renderView = (tab: string) => {
    const textColor = tab === selectedActiveTab ? color : colors.gray;
    return (
      <TabBarText
        activeTab={selectedActiveTab}
        selectTab={tab}
        color={textColor}>
        {tab}
      </TabBarText>
    );
  };

  return (
    <TabContainer
      size={tabSize}
      tabBackColor={tabBackgroundColor}
      width={tabWidth}
      radius={radius}>
      {tab &&
        tab.map((tab, index) => {
          return (
            <TabPress
              onPress={() => isTabChange && handleTabChange(tab, index)}
              key={index}
              activeTab={selectedActiveTab}
              selectTab={tab}
              tabBackColor={selectedTabColor}
              radius={radius}>
              {renderView(tab)}
            </TabPress>
          );
        })}
    </TabContainer>
  );
};

export default TabBar;
