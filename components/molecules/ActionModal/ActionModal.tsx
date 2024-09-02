import React, { memo } from 'react';
import { Actions, RNModalProps } from './ActionModal.props';
import Modal from '@atoms/Modal/Modal';
import {
  ModalContainer,
  Header,
  Description,
  ButtonContainer,
  PrimaryLabel,
  SecondaryLabel,
  CrossIconContainer,
  AllButtonView,
  ActionPressable,
  CancelPressable,
} from './ActionModal.styles';
import { useAppTheme } from '@constants/theme';
import CrossIcon from '@atoms/Illustrations/Cross';
import { Spacer } from '@atoms/common/common.styles';
import Loader from '@atoms/Loader/Loader';

const ActionModal: React.FC<RNModalProps> = memo(
  ({
    isModal,
    icon,
    heading,
    description,
    actionType,
    label,
    actiontext,
    onActionPress,
    onCancelPress,
    onBackdropPress,
    crossIcon,
    loading,
  }) => {
    const isIcon = !!icon;
    const { colors } = useAppTheme();
    const handleSubmit = () => {
      if (!loading) {
        onActionPress();
      }
    };
    return (
      <Modal
        isVisible={isModal}
        onBackdropPress={() => {
          onBackdropPress?.();
        }}>
        <ModalContainer>
          {crossIcon && (
            <CrossIconContainer onPress={() => onBackdropPress?.()}>
              <CrossIcon color={colors.white} />
            </CrossIconContainer>
          )}
          {icon || null}
          <Header isIcon={isIcon}>{heading}</Header>
          <Spacer size={16} />
          <Description>{description}</Description>
          <Spacer size={36} />
          <ButtonContainer>
            <AllButtonView>
              <CancelPressable onPress={onCancelPress}>
                <SecondaryLabel>{actiontext}</SecondaryLabel>
              </CancelPressable>
              <ActionPressable onPress={handleSubmit}>
                {loading && <Loader size={16} color={colors?.deleteColor} />}
                <PrimaryLabel actionType={actionType || Actions.default}>
                  {label}
                </PrimaryLabel>
              </ActionPressable>
            </AllButtonView>
          </ButtonContainer>
        </ModalContainer>
      </Modal>
    );
  },
);

export default ActionModal;
