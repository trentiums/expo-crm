export interface DropDownProps {
  data: DropDownData[];
  value?: string | number[] | number;
  isMultiple?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  isShowSelected?: boolean;
  isSearch?: boolean;
  onEndReached?: () => void;
}

export interface DropDownData {
  id: number;
  title: string;
  image?: string;
}
