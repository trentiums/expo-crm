import { FormRenderProps } from "react-final-form";

export type LeadDetailsFormValues = {
  product: string;
  budget?: number | string;
  timeFrame?: number | string;
  comments: string;
  winCloseReason: string;
  dealCloseDate?: string | Date;
  dealAmount?: number | string;
};

export type LeadDetailsFormProps = FormRenderProps<LeadDetailsFormValues> & {
  loading?: boolean;
  isSave?: boolean;
  onBackClick?: () => void;
  setSourceValue: (id: number) => void;
  sourceValue: number;
  setSelectedChannel: (value: number) => void;
  setSelectedLead: (value: number) => void;
  setSelectedStage: (value: number) => void;
  selectedChannel: number;
  selectedLead: number;
  selectedStage: number;
  selectedService: number[];
  setSelectedService: (value: number[]) => void;
  assignTo: number;
  setAssignTo: (value: number) => void;
};
export interface IconDataType {
  value: number;
  id: number;
}
