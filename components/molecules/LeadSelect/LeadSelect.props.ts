import { GeneralList } from "@type/redux/slices/general";

export interface LeadListProps {
  value: number;
  label: string;
}

export interface LeadSelectProps {
  channelList: GeneralList[];
  leadList: GeneralList[];
  StageList: GeneralList[];
  selectedChannel?: number;
  setSelectedChannel: (leadId: number, value: number) => void;
  selectedLead?: number;
  setSelectedLead: (leadId: number, value: number) => void;
  selectedStage?: number;
  setSelectedStage: (leadId: number, value: number) => void;
  leadCardId: number;
  isAdmin?: boolean;
  assignTo: number;
  setAssignTo: (value: number) => void;
}
