import { DropdownDataType } from '@organisms/FieldDropDown/FieldDropDown.props';

export interface SearchFilterProps {
  setSearch: (value: string) => void;
  search: string;
  handleSearch?: (search: SearchType) => void;
  rightIcon?: React.FC;
  onRightIconPress?: () => void;
  searchRadius?: number;
  dropdownDataType?: DropdownDataType;
}
export interface SearchType {
  search: string;
}
