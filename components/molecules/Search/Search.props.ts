export interface SearchFilterProps {
  setSearch: (value: string) => void;
  search: string;
  handleSearch?: (search: SearchType) => void;
  rightIcon?: React.FC;
  onRightIconPress?: () => void;
  searchRadius?: number;
}
export interface SearchType {
  search: string;
}
