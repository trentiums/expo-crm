import React from 'react';
import {
  IconContainer,
  ItemContainer,
  OptionLabel,
  OptionLabelContainer,
} from './MenuOptionItem.styles';
import { MenuOptionsItemProps } from './MenuOptionItem.props';
import { Flexed, Spacer } from '@atoms/common/common.styles';

const MenuOptionItem: React.FC<MenuOptionsItemProps> = ({
  icon,
  label,
  handlePress,
  rightContainer,
}) => {
  return (
    <ItemContainer onPress={handlePress}>
      <IconContainer>{icon}</IconContainer>
      <Spacer size={15} />
      <OptionLabelContainer>
        <Flexed>
          <OptionLabel variant="SF-Pro-Display-Medium_500">{label}</OptionLabel>
        </Flexed>
        <>{rightContainer?.()}</>
      </OptionLabelContainer>
    </ItemContainer>
  );
};

export default MenuOptionItem;
