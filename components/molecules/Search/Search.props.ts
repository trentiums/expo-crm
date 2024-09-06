export interface SearchFilterProps {
  setSearch: (value: string) => void;
  search: string;
  handleSearch: (search: SearchType) => void;
  rightIcon?: React.FC;
  onRightIconPress?: () => void;
}
export interface SearchType {
  search: string;
}
