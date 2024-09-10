import TextInput from '@atoms/TextInput/TextInput';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { Pressable } from 'react-native';
import { View as RNView } from 'react-native';

export const FilterContainer = styled(View)`
  flex-direction: row;
  padding-bottom: 16px;
  margin-top: 16px;
  gap: 16px;
`;
export const FilterIconView = styled(Pressable)`
  width: 50px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 10;
  top: 0;
  bottom: 0;
  z-index: 1;
`;
export const SearchInputContainer = styled(RNView)`
  flex: 1;
`;
export const SearchTextInput = styled(TextInput)`
  background-color: ${({ theme }) => theme.colors.snowflake};
  border-radius: 25px;
  overflow: hidden;
  border-color: ${({ theme }) => theme.colors.primaryColor};
  padding-left: -20px;
  padding-right: 40px;
`;
