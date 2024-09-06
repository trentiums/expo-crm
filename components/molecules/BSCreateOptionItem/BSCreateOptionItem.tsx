import React from 'react';
import {
  IconContainer,
  ItemContainer,
  LabelText,
} from './BSCreateOptionItem.styles';
import { BSCreateOptionItemProps } from './BSCreateOptionItem.props';

const CreateOptionsItem: React.FC<BSCreateOptionItemProps> = ({
  icon,
  label,
  handlePress,
}) => {
  return (
    <ItemContainer onPress={() => handlePress()}>
      <IconContainer>{icon}</IconContainer>
      <LabelText>{label}</LabelText>
    </ItemContainer>
  );
};

export default CreateOptionsItem;
