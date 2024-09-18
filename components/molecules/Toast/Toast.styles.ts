import { styled } from '@utils/styled';
import Text from '@atoms/Text/Text';
import { Pressable, View } from 'react-native';
import { Card } from 'react-native-paper';

export const Container = styled(Card)<{ isError?: boolean }>`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 6px;
  background-color: ${({ isError, theme }) =>
    isError ? theme.colors.notificationError : theme.colors.funGreen};
`;

export const NotificationBox = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
`;

export const MessageText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  max-width: 300px;
`;

export const IconContainer = styled(Pressable)`
  padding: 8px;
`;

export const NotificationContent = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NotificationCopyContent = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const CloseText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
`;
