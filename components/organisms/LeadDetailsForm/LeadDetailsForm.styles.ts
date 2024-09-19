import Button from '@atoms/Button/Button';
import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';

export const FormsView = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  flex-basis: auto;
  margin-bottom: 16px;
`;

export const FieldDropDownContainer = styled(View)<{ isError?: boolean }>`
  background-color: ${({ theme }) => theme.colors.transparent};
  padding: 10px 0px;
  border-radius: 4px;
  border-width: 1px;
  color: ${({ theme }) => theme.colors.bgColor};
  border-color: ${({ theme, isError }) =>
    isError ? theme.colors.error : theme.colors.grayText};
`;

export const ButtonSubmit = styled(Button)<{ valid: boolean }>`
  height: 48px;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ valid, theme }) =>
    valid ? theme.colors.primaryColor : theme.colors.lightGray};
  background-color: ${({ theme }) => theme.colors.bgColor};
`;

export const KeyboardAwareScrollViewContainer = styled(KeyboardAwareScrollView)`
  min-height: 90%;
  position: relative;
  z-index: 1;
`;

export const ContainerView = styled(View)`
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  flex-direction: row;
  align-content: center;
  gap: 16px;
`;
export const SubContainerView = styled(View)`
  flex: 0.5;
  z-index: 2;
  justify-content: flex-end;
`;

export const FormButtonText = styled(Text)<{ valid: boolean }>`
  color: ${({ valid, theme }) =>
    valid ? theme.colors.white : theme.colors.lightGray};
`;
export const LabelDescriptionText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textGray};
`;
export const ServiceLabel = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textDark};
`;
export const RowView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  gap: 8px;
`;
export const DropdownView = styled(View)`
  flex: 0.3;
  padding: 18px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.iceWindDale};
`;

export const InputView = styled(View)`
  flex: 0.7;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.iceWindDale};
`;
export const SelectedServiceData = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.white};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 19px;
  gap: 8px;
  margin-right: 8px;
  flex: 1;
  flex-basis: auto;
  margin: 0px 8px;
`;
export const ServiceText = styled(Text)`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.carbonFootprint};
`;
export const showMultipleDataList = styled(FlatList).attrs({
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})``;
export const SelectedUserData = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.plaster};
  border-radius: 19px;
  gap: 8px;
  margin-right: 8px;
`;
