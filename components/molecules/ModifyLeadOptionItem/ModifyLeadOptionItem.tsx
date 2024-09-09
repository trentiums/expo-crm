import React from 'react';
import {
  IconContainer,
  ItemContainer,
  OptionLabel,
} from './ModifyLeadOptionItem.styles';
import { ModifyLeadOptionItemProps } from './ModifyLeadOptionItem.props';
import { Flexed, Spacer } from '@atoms/common/common.styles';
import ArrowRightIcon from '@atoms/Illustrations/ArrowRight';
import { OptionLabelContainer } from '@molecules/BottomSheetItemListing/BottomSheetItemListing.styles';
import { Pressable } from 'react-native';

const ModifyLeadOptionItem: React.FC<ModifyLeadOptionItemProps> = ({
  icon,
  label,
  handlePress,
  bottomSheetRoute,
}) => {
  return (
    <ItemContainer onPress={() => handlePress()}>
      <IconContainer>{icon}</IconContainer>
      <Spacer size={15} />
      <OptionLabelContainer>
        <Flexed>
          <OptionLabel>{label}</OptionLabel>
        </Flexed>
        {bottomSheetRoute && (
          <Pressable>
            <ArrowRightIcon />
          </Pressable>
        )}
      </OptionLabelContainer>
    </ItemContainer>
  );
};

export default ModifyLeadOptionItem;
