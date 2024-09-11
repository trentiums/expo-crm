import { fileSystemProps } from '@organisms/BasicInformationForm/BasicInformationForm.props';

export interface DocumentPickerProps {
  documentArray: fileSystemProps[];
  setDocumentArray: React.Dispatch<React.SetStateAction<fileSystemProps[]>>;
}
export enum PermissionType {
  Granted = 'granted',
}
