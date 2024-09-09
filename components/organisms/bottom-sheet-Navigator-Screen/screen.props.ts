import { ReactNode } from 'react';

export type CreateOptionProps = {
  changeSnapPoints: (points: string[]) => void;
  changeRoute?: () => void;
};

export type CreateOptionItemProps = {
  label: string;
  icon: ReactNode;
  route: string;
};
export interface LeadSortFilterItemProp {
  id: number;
  title: string;
  filters: {
    sort_order: number;
    order_by: number;
  };
}
