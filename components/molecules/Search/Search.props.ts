export interface SearchFilterProps {
  setSearch: (value: string) => void;
  search: string;
  handleSearch: (search: SearchType) => void;
}
export interface SearchType {
  search: string;
}
