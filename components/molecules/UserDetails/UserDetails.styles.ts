import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { Image, Pressable } from 'react-native';
import styled from 'styled-components';

export const DetailContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  gap: 8px;
  width: 100%;
`;
export const ImageContainer = styled(View)`
  display: flex;
  flex-direction: column;
  flex: 0.3;
  align-self: center;
  justify-self: center;
`;

export const LeadImage = styled(Image)`
  width: 98px;
  height: 98px;
  border-radius: 10px;
`;

export const NameContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0.7;
`;

export const NumberView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;
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
  flex-wrap: wrap;
`;

export const DateTimeText = styled(Text)`
  color: ${({ theme }) => theme.colors.lightGrayColor};
  font-size: 10px;
`;
