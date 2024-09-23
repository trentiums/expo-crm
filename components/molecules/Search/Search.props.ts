import { ReactNode } from 'react';

export interface SearchFilterProps {
  setSearch: (value: string) => void;
  search: string;
  handleSearch?: (search: SearchType) => void;
  rightIcon?: ReactNode;
  onRightIconPress?: () => void;
  searchRadius?: number;
}
export interface SearchType {
  search: string;
}
