import { fileSystemProps } from '@organisms/BasicInformationForm/BasicInformationForm.props';
import { FormRenderProps } from 'react-final-form';

export type LeadStatusChangeFormValues = {
  companyName: string;
  webSite: string;
  budget: number | string;
  timeFrame: number | string;
  comments: string;
};
export type LeadStatusChangeFormProps =
  FormRenderProps<LeadStatusChangeFormValues> & {
    loading?: boolean;
    onCancelPress?: () => void;
    leadCardId: number;
    setDocuments: (file: any) => void;
    documents: fileSystemProps[];
  };
