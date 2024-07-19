import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { Pressable } from 'react-native';
import styled from 'styled-components';

export const DetailContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: flex-start;
  gap: 8px;
  width: 100%;
  padding: 0px 8px;
`;

export const NameContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;
export const TitleView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

export const NumberEmailView = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  justify-content: space-between;
`;

export const NumberView = styled(View)<{ isFullNumber?: boolean }>`
  flex: ${({ isFullNumber }) => (isFullNumber ? 0.4 : 0.3)};
`;

export const EmailView = styled(View)<{ isFullEmail?: boolean }>`
  flex: ${({ isFullEmail }) => (isFullEmail ? 0.6 : 0.4)};
`;

export const TextView = styled(View)<{ isFull: boolean }>`
  width: ${({ isFull }) => (isFull ? '100%' : '90%')};
`;

export const NameText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: 700;
`;

export const SubNameText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 500;
`;

export const PressAbleContainer = styled(Pressable)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  flex: 1;
`;

export const DateTimeText = styled(Text)`
  color: ${({ theme }) => theme.colors.lightGrayColor};
  font-size: 10px;
`;
export const WhatsAppIcon = styled(Pressable)`
  padding: 4px;
`;
