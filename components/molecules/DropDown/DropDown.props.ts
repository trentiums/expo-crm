export interface DropDownProps {
  data: DropDownData[];
  value?: string | number[] | number;
  isMultiple?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  isShowSelected?: boolean;
  isSearch?: boolean;
}

export interface DropDownData {
  id: number;
  title: string;
  image?: string;
}
