import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';
import styled from 'styled-components';

export const DetailContainer = styled(View)`
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  gap: 8px;
`;
export const LeadInfoView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: 'flex-start';
  flex: 1;
  flex-basis: auto;
  gap: 14px;
`;

export const NameText = styled(Text)`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 18px;
  font-weight: 700;
`;

export const DateTimeText = styled(Text)`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: 14px;
`;
export const CommunicationOptionCon = styled(Pressable)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.lightGray};
  padding: 8px 0px;
  border-radius: 16px;
  flex: 1;
`;

export const NameAndStatusContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;
export const ContactBox = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 12px;
`;

export const ActionMenuIcon = styled(IconButton)`
  margin-right: -5px;
  margin-top: -5px;
`;
