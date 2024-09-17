import { DropdownDataType } from '@organisms/FieldDropDown/FieldDropDown.props';
import { ReactNode } from 'react';

export interface SearchFilterProps {
  setSearch: (value: string) => void;
  search: string;
  handleSearch?: (search: SearchType) => void;
  rightIcon?: ReactNode;
  onRightIconPress?: () => void;
  searchRadius?: number;
  dropdownDataType?: DropdownDataType;
}
export interface SearchType {
  search: string;
}
