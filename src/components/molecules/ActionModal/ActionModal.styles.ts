import { styled } from '@utils/styled';
import { View, Pressable } from 'react-native';
import Text from '@atoms/Text/Text';
import { Actions } from './ActionModal.props';

export const ModalContainer = styled(View)`
  margin: 24px;
  padding: 24px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.modalContainer};
  border-radius: 8px;
  min-width: 200px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Header = styled(Text)<{ isIcon: boolean }>`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.modalHeading};
  text-align: center;
  margin-top: ${({ isIcon }) => (isIcon ? 16 : 0)}px;
`;

export const Description = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.modalDescription};
  text-align: center;
  align-self: center;
`;

export const ButtonContainer = styled(View)`
  width: 100%;
`;

export const AllButtonView = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-self: flex-end;
`;

export const PrimaryLabel = styled(Text)<{ actionType: Actions }>`
  color: ${({ actionType, theme }) =>
    actionType === Actions.success
      ? theme.colors.primaryColor
      : actionType === Actions.delete
        ? theme.colors.deleteColor
        : actionType === Actions.default
          ? theme.colors.white
          : 'none'};
  font-size: 14px;
  font-weight: 600;
  justify-content: center;
  align-content: center;
`;

export const SecondaryLabel = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray};
`;

export const CrossIconContainer = styled(Pressable)`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
`;

export const ActionPressable = styled(Pressable)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 8px 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.error};
  border-radius: 8px;
`;
export const CancelPressable = styled(Pressable)`
  padding: 8px 16px;
`;
