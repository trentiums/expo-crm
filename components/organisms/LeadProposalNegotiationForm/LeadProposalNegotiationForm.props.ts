import { FormRenderProps } from 'react-final-form';

export type LeadProposalNegotiationValues = {
  description: string;
};
export type LeadProposalNegotiationFormProps =
  FormRenderProps<LeadProposalNegotiationValues> & {
    loading?: boolean;
    onCancelPress?: () => void;
  };
