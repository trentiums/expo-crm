import { styled } from '@utils/styled';
import Text from '@atoms/Text/Text';
import { Pressable, View } from 'react-native';

export const HeaderWithTextContainer = styled(View)<{ top?: number }>`
  display: flex;
  flex-direction: row;
  padding: 0px 16px;
  padding-bottom: 16px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: ${({ top }) => (top ? top - 20 : 0)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.lightBlack};
  margin-bottom: 16px;
`;

export const HeaderTextCon = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-right: 32px;
`;

export const TextInHeader = styled(Text)`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.black};
`;

export const SkipText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grayText};
`;
export const SkipCon = styled(Pressable)`
  align-items: flex-end;
  padding-top: 6px;
  padding-bottom: 6px;
`;

export const IconCon = styled(View)`
  flex: 0.1;
  justify-content: center;
`;
