export enum Actions {
  success = 'success',
  delete = 'delete',
  default = 'default',
}

export interface RNModalProps {
  isModal: boolean;
  icon?: React.ReactNode;
  heading: string;
  description: string;
  actionType?: Actions;
  label?: string;
  actiontext?: string;
  onActionPress: () => void;
  onCancelPress: () => void;
  onBackdropPress: () => void;
  crossIcon?: boolean;
  loading?: boolean;
}
