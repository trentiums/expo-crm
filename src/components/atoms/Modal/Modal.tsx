import React, { memo } from 'react';
import { ModalView } from './Modal.styles';
import { ModalsProps } from './Modal.props';

const Modal: React.FC<ModalsProps> = memo(({ children, ...rest }) => {
  return <ModalView {...rest}>{children}</ModalView>;
});

export default Modal;
