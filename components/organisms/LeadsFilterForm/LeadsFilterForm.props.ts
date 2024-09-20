import { FormRenderProps } from 'react-final-form';

export type LeadsFilterFormValues = {
  startDate: string;
  endDate: string;
  orderBy?: number;
  sortBy?: number;
  selectedChannel?: number;
  selectedStatus?: number;
  selectedStage?: number;
};
export type LeadFilterFormProps = FormRenderProps<LeadsFilterFormValues> & {
  loading?: boolean;
  setSelectedChannel: (value: number) => void;
  setSelectedLead: (value: number) => void;
  setSelectedStage: (value: number) => void;
  selectedChannel: number;
  selectedLead: number;
  selectedStage: number;
  orderBy: number;
  setOrderBy: (value?: number) => void;
  setSortBy: (value?: number) => void;
  sortBy: number;
  handleDropDownClose?: () => void;
  startDate: Date;
  setStartDate: (value: Date) => void;
  endDate: Date;
  setEndDate: (value: Date) => void;
  setFilterCount?: (value: number) => void;
  bottomSheetClose?: () => void;
  changeRoute?: () => void;
};
