export interface DropDownProps {
  data: DropDownData[];
  value: string | number[];
  isMultiple?: boolean;
  onChange?: (value: string) => void;
  placeholder: string;
  dropDownTitle: string;
  dataToShow?: DropDownData[];
  isDataToShow?: boolean;
}

export interface DropDownData {
  id: number;
  title: string;
  image?: string;
}
