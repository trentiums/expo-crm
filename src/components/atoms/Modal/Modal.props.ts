import Modal, { ModalProps } from 'react-native-modal';

export type ModalsProps = React.ComponentProps<typeof Modal> &
  ModalProps & {
    children: React.ReactNode;
  };
