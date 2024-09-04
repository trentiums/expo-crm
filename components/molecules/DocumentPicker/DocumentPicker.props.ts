import { fileSystemProps } from '@organisms/BasicInformatioForm/BasicInformationForm.props';

export interface DocumentPickerProps {
  documentArray: fileSystemProps[];
  setDocumentArray: React.Dispatch<React.SetStateAction<fileSystemProps[]>>;
}
