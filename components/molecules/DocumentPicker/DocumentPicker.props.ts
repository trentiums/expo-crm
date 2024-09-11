import { fileSystemProps } from '@organisms/BasicInformationForm/BasicInformationForm.props';

export interface DocumentPickerProps {
  documentArray: fileSystemProps[];
  setDocumentArray: (file: fileSystemProps) => void;
  isProductServices?: boolean;
}
export enum PermissionType {
  Granted = 'granted',
}
