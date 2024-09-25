import { FormRenderProps } from 'react-final-form';

export type DealWinCloseFormValues = {
  dealAmount: number | string;
  description: string;
  reason: string;
  dealAmountCurrencyCode?: number;
};

export type DealWinCloseFormProps = FormRenderProps<DealWinCloseFormValues> & {
  loading?: boolean;
  isDealClose?: boolean;
  onCancelPress?: () => void;
  leadCardId: number;
};
