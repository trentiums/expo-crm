import { FormRenderProps } from 'react-final-form';

export type CompanyInfoFormValues = {
  companyName: string;
  industry: string;
  companySize: number;
  webSite: string;
};

export type CompanyInfoFormProps = FormRenderProps<CompanyInfoFormValues> & {
  loading?: boolean;
  isSave?: boolean;
  onBackClick?: () => void;
};
