import { fileSystemProps } from '@organisms/BasicInformatioForm/BasicInformationForm.props';

export interface AddLeadState {
  fullName: string;
  phoneNumber?: number;
  countryCode?: number | string;
  email: string;
  companyName: string;
  companySize?: number;
  webSite: string;
  source?: number;
  budget?: number;
  timeFrame?: string;
  comments: string;
  selectedLead: number;
  selectedChannel: number;
  selectedStage: number;
  selectedServices: number[];
  dealAmount: number;
  winCloseReason: string;
  dealCloseDate: Date | string;
  documents?: fileSystemProps[];
}
