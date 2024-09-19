import React from 'react';
import {
  IconContainer,
  ItemContainer,
  OptionLabel,
} from './CreateOptionItem.styles';
import { CreateOptionItemProps } from './CreateOptionItem.props';

const CreateOptionsItem: React.FC<CreateOptionItemProps> = ({
  icon,
  label,
  handlePress,
}) => {
  return (
    <ItemContainer onPress={handlePress}>
      <IconContainer>{icon}</IconContainer>
      <OptionLabel variant="SF-Pro-Display-Medium_500">{label}</OptionLabel>
    </ItemContainer>
  );
};

export default CreateOptionsItem;
