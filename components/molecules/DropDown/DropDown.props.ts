export interface DropDownProps {
  data: DropDownData[];
  value: string | number[] | number;
  isMultiple?: boolean;
  onChange?: (value: string) => void;
  placeholder: string;
  dropDownTitle: string;
  dataToShow?: DropDownData[];
  isDataToShow?: boolean;
  isLeadChange?: boolean;
  isFullWidth?: boolean;
  isStaff?: boolean;
  handleBottomSheetClose?: () => void;
}

export interface DropDownData {
  id: number;
  title: string;
  image?: string;
}
