import { FormRenderProps } from 'react-final-form';

export type BasicInfoFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  countryCode: number;
};

export interface fileSystemProps {
  id: any;
  mimeType: string;
  fileCopyUri: string;
  name: string;
  size: number;
  type: string;
  uri: string | string[] | number;
}

export type BasicInfoFormProps = FormRenderProps<BasicInfoFormValues> & {
  loading?: boolean;
  isSave?: boolean;
  selectedCountryCodeValue: number;
  setSelectedCountryCodeValue: (values: number | string) => void;
  documentArray: fileSystemProps[];
  setDocumentArray: React.Dispatch<React.SetStateAction<fileSystemProps[]>>;
};
