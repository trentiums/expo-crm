import React from 'react';
import {
  IconContainer,
  ItemContainer,
  LabelText,
} from './BSAddOptionItem.styles';
import { BSAddOptionItemProps } from './BSAddOptionItem.props';

const AddOptionsItem: React.FC<BSAddOptionItemProps> = ({
  icon,
  label,
  handlePress,
}) => {
  return (
    <ItemContainer onPress={handlePress}>
      <IconContainer>{icon}</IconContainer>
      <LabelText>{label}</LabelText>
    </ItemContainer>
  );
};

export default AddOptionsItem;
