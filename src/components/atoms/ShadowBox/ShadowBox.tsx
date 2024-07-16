import React from "react";
import { View, ViewStyle } from "react-native";
import { useAppTheme } from "@constants/theme";
import { shadowboxProps } from "./ShadowBox.props";

const ShadowBox: React.FC<shadowboxProps> = ({
  children,
  elevation,
  radius,
  shadowColor,
  style,
  mode,
}) => {
  const { colors } = useAppTheme();
  const aroundShadowStyle: ViewStyle = {
    margin: 5,
    shadowColor: shadowColor || colors.notificationShadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: elevation || 4,
    borderRadius: radius || 30,
  };
  const bottomShadowStyle: ViewStyle = {
    margin: 5,
    shadowColor: shadowColor || colors.notificationShadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: elevation || 1,
    borderRadius: radius || 30,
  };

  const handleMode = () => {
    switch (mode) {
      case "around":
        return aroundShadowStyle;
      case "bottom":
        return bottomShadowStyle;
    }
  };

  return <View style={[handleMode(), style]}>{children}</View>;
};

export default ShadowBox;
