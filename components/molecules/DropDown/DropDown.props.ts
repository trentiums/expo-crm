import { DropdownDataType } from '@organisms/FieldDropDown/FieldDropDown.props';

export interface DropDownProps {
  data: DropDownData[];
  value?: string | number[] | number;
  isMultiple?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  isShowSelected?: boolean;
  isSearch?: boolean;
  dropdownDataType?: DropdownDataType;
}

export interface DropDownData {
  id: number;
  title: string;
  image?: string;
}
