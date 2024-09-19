import { styled } from '@utils/styled';
import { View } from 'react-native';
import Text from '@atoms/Text/Text';
import Modal from '@atoms/Modal/Modal';

export const Container = styled(View)`
  background-color: ${({ theme }) => theme.colors.iceWindDale};
  border-radius: 10px;
  flex-direction: row;
  padding: 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.disabledTextColor};
`;

export const DateView = styled(View)`
  flex: 0.8;
`;

export const DateText = styled(Text)<{ input?: string }>`
  font-size: 16px;
  color: ${({ theme, input }) =>
    input ? theme.colors.englishHolly : theme.colors.placeholderTextColor};
  margin: 0px 0px 2px;
  padding-top: 2px;
`;

export const CalendarIcon = styled(View)`
  flex: 0.2;
  align-items: flex-end;
`;

export const ModalContainer = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DatePickerContainer = styled(View)`
  width: fit-content;
`;
