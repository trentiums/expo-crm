import React from 'react';
import {
  ItemContainer,
  OptionLabel,
  OptionLabelContainer,
} from './BottomSheetItemListing.styles';
import { BottomSheetItemListingProps } from './BottomSheetItemListing.props';
import CircleCheckIcon from '@atoms/Illustrations/CircleCheck';

const BottomSheetItemListing: React.FC<BottomSheetItemListingProps> = ({
  label,
  handlePress,
  isSelected,
}) => {
  return (
    <ItemContainer onPress={handlePress}>
      <OptionLabelContainer>
        <OptionLabel>{label}</OptionLabel>
      </OptionLabelContainer>
      {isSelected && <CircleCheckIcon />}
    </ItemContainer>
  );
};

export default BottomSheetItemListing;
