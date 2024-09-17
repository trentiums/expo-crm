import React from 'react';
import {
  FilterTitle,
  FilterType,
  QuickFilterContainer,
  SelectedFilterWithIcon,
} from './QuickFilter.styles';
import ArrowDown from '@atoms/Illustrations/ArrowDown';
import { QuickFilterProps } from './QuickFilter.props';

const QuickFilter: React.FC<QuickFilterProps> = ({
  filterType,
  filterTitle,
  onFilterPress,
}) => {
  return (
    <QuickFilterContainer>
      <FilterType>{`${filterType}: `}</FilterType>
      <SelectedFilterWithIcon onPress={onFilterPress}>
        <FilterTitle>{filterTitle}</FilterTitle>
        <ArrowDown />
      </SelectedFilterWithIcon>
    </QuickFilterContainer>
  );
};

export default QuickFilter;
