import Button from '@atoms/Button/Button';
import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { Image, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Label = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray};
  padding-bottom: 4px;
`;

export const PickerContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.darkBackground};
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.disabledTextColor};
  width: 150px;
  height: 150px;
  align-content: center;
  border-radius: 80px;
`;

export const AddIconButton = styled(Pressable)`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PreviewImageView = styled(Image)`
  height: 135px;
  width: 135px;
  border-radius: 100px;
`;

export const ButtonSubmit = styled(Button)<{ valid: boolean }>`
  height: 48px;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ valid, theme }) =>
    valid ? theme.colors.primaryColor : theme.colors.lightGray};
  background-color: ${({ theme }) => theme.colors.bgColor};
  z-index: 10;
`;

export const ViewMainContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  margin-bottom: 32px;
`;

export const PressAbleView = styled(Pressable)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-items: center;
`;

export const KeyboardAwareScrollViewContainer = styled(KeyboardAwareScrollView)`
  min-height: 90%;
  z-index: 1;
`;

export const FormButtonText = styled(Text)<{ valid: boolean }>`
  font-weight: 700;
  color: ${({ valid, theme }) =>
    valid ? theme.colors.primaryColor : theme.colors.lightGray};
`;

export const MainProfileView = styled(View)`
  display: flex;
  align-items: center;
`;

export const PhoneNumberFieldView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

export const CountryCodeInput = styled(View)`
  flex: 0.25;
`;

export const NumberInput = styled(View)`
  flex: 0.75;
`;
