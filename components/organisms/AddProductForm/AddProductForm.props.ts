import { FileSystemProps } from '@organisms/BasicInformationForm/BasicInformationForm.props';
import { FormRenderProps } from 'react-final-form';

export type AddProductFormValues = {
  name: string;
  description?: string;
};

export type AddProductFormProps = FormRenderProps<AddProductFormValues> & {
  loading?: boolean;
  documentArray: FileSystemProps;
  setDocumentArray: React.Dispatch<React.SetStateAction<FileSystemProps[]>>;
};
