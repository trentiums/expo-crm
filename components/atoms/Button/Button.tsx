import React from 'react';
import { Button as RNPButton } from 'react-native-paper';
import { ButtonProps } from './Button.props';
import { styles } from './Button.styles';
import { useAppTheme } from '@constants/theme';

const Button: React.FC<ButtonProps> = ({
  children,
  mode = 'contained',
  labelStyle,
  contentStyle,
  style,
  onPress,
  ...rest
}) => {
  const { colors } = useAppTheme();
  return (
    <RNPButton
      mode={mode}
      onPress={onPress}
      labelStyle={[styles.labelStyle, labelStyle, { color: colors.white }]}
      contentStyle={[styles.contentStyle, contentStyle]}
      style={[styles.buttonStyle, style]}
      {...rest}>
      {children}
    </RNPButton>
  );
};

export default Button;
