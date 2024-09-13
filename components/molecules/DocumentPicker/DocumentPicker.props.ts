import { FileSystemProps } from '@organisms/BasicInformationForm/BasicInformationForm.props';

export interface DocumentPickerProps {
  documentArray: FileSystemProps[];
  setDocumentArray: (file: FileSystemProps) => void;
}
export enum PermissionType {
  Granted = 'granted',
}
