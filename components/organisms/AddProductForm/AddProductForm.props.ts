import { fileSystemProps } from '@organisms/BasicInformationForm/BasicInformationForm.props';
import { FormRenderProps } from 'react-final-form';

export type AddProductFormValues = {
  name: string;
  description?: string;
};

export type AddProductFormProps = FormRenderProps<AddProductFormValues> & {
  loading?: boolean;
  documentArray: fileSystemProps;
  setDocumentArray: React.Dispatch<React.SetStateAction<fileSystemProps[]>>;
};
