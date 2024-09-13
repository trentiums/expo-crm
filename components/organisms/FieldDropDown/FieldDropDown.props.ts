import { ReactNode } from 'react';
import { FieldRenderProps } from 'react-final-form';

export type FieldDropDownProps = CustomDropDownProps &
  FieldRenderProps<number[]>;

export type CustomDropDownProps = {
  text: string;
  label: string;
  icon: React.ReactNode;
  listData: ItemList[];
  onSearch: (value: string) => void;
  handleSelectPress: (value: string) => void;
  defaultImage?: React.ReactNode;
  focus: () => void;
  blur: () => void;
  labelIcon?: React.ReactNode;
  notSearchView?: string;
  isMultiple?: boolean;
  iconStyle?: {};
  rightIcon?: React.ReactNode;
  dropDownTextIconStyle?: {};
  withoutTitle?: boolean;
  labelVariant?: string;
  searchPlaceHolder?: string;
  selectedDataId?: number | number[];
  isDisplayCount?: boolean;
  searchTitle?: string;
  isShowSelect?: boolean;
  sheetPoints?: number | string[];
  initialData?: ItemList[];
  showResult?: boolean;
  resultText?: string;
  disabled?: boolean;
  noSearchBar?: boolean;
  handleOnEndReached?: () => void;
  onClearIconPress?: () => void;
  isAllowDeselect?: boolean;
  isSearch?: boolean;
};

export interface ItemList {
  flag: ReactNode;
  id: number;
  title: string;
  icon?: string;
}
