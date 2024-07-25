import Text from "@atoms/Text/Text";
import View from "@atoms/View/View";
import { Pressable } from "react-native";
import styled from "styled-components";

export const DetailContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-start;
  gap: 8px;
  width: 100%;
`;

export const NameContainer = styled(View)`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  padding: 0px 8px;
  justify-content: space-between;
`;
export const TitleView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
`;

export const WhatsAppIconView = styled(View)<{ isShow?: boolean }>`
  width: ${({ isShow }) => (isShow ? 20 : 0)}%;
`;

export const NumberEmailView = styled(View)<{ isFull?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

export const NumberView = styled(View)<{ isFullNumber?: boolean }>``;

export const EmailView = styled(View)<{ isFullEmail?: boolean }>``;

export const TextView = styled(View)<{ isFull: boolean }>``;

export const NameText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 12px;
`;

export const SubNameText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  text-align: end;
  margin-left: auto;
`;

export const PressAbleContainer = styled(Pressable)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-end;
`;

export const DateTimeText = styled(Text)`
  color: ${({ theme }) => theme.colors.lightGrayColor};
  font-size: 10px;
`;
export const WhatsAppIcon = styled(Pressable)`
  padding: 4px;
`;
