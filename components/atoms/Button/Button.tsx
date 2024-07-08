import React from 'react';
import { Button as RNPButton } from 'react-native-paper';
import { ButtonProps } from './Button.props';
import { styles } from './Button.styles';

const Button: React.FC<ButtonProps> = ({
  children,
  mode = 'contained',
  labelStyle,
  contentStyle,
  style,
  onPress,
  ...rest
}) => {
  return (
    <RNPButton
      mode={mode}
      onPress={onPress}
      uppercase={true}
      labelStyle={[styles.labelStyle, labelStyle]}
      contentStyle={[styles.contentStyle, contentStyle]}
      style={[styles.buttonStyle, style]}
      {...rest}>
      {children}
    </RNPButton>
  );
};

export default Button;
