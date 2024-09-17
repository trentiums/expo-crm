export interface DropDownProps {
  data: DropDownData[];
  value?: string | number[] | number;
  isMultiple?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  isShowSelected?: boolean;
  heading: string;
}

export interface DropDownData {
  id: number;
  title: string;
  image?: string;
}
