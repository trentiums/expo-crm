import { fileSystemProps } from '@organisms/BasicInformationForm/BasicInformationForm.props';

export interface DocumentPickerProps {
  documentArray: fileSystemProps[];
  setDocumentArray: (file: fileSystemProps) => void;
}
export enum PermissionType {
  Granted = 'granted',
}
