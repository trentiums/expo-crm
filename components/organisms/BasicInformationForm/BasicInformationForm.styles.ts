import Button from '@atoms/Button/Button';
import Modal from '@atoms/Modal/Modal';
import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { Image } from 'expo-image';
import { FlatList, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const BasicInformationButtons = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const BasicInformationActionButtons = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 44px;
`;

export const ActionsText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.lightGreen};
`;

export const Label = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textDark};
  padding-bottom: 10px;
`;

export const PickerContainer = styled(Pressable)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.christmasSilver};
  border-style: dashed;
  margin-top: 4px;
`;

export const AddIconButton = styled(View)`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UploadText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
  padding-top: 8px;
`;

export const DeleteDocumentView = styled(Pressable)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PreviewImageView = styled(Image)`
  height: 80%;
  width: 100%;
`;

export const SvgShowContainer = styled(View)`
  border-radius: 8px;
  position: absolute;
  top: 50px;
  left: 40%;
`;
export const ImagePreviewShow = styled(Image)`
  height: 120px;
  width: 100%;
  border-radius: 8px;
`;

export const DocumentView = styled(View)`
  margin: 8px;
  display: flex;
  flex: 0.3333;
`;

export const HeaderText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 500;
`;

export const ButtonSubmit = styled(Button)<{ valid: boolean }>`
  height: 48px;
  justify-content: center;
  background-color: ${({ theme, valid }) =>
    valid ? theme.colors.blueChaos : theme.colors.gray};
  border-radius: 50px;
`;
export const KeyboardAwareScrollViewContainer = styled(KeyboardAwareScrollView)`
  min-height: 50%;
  z-index: 1;
`;

export const ContainerView = styled(View)`
  margin-left: 16px;
  margin-right: 16px;
  position: absolute;
  bottom: 0;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-content: center;
  width: 100%;
  gap: 16px;
  z-index: 2;
`;

export const FormButtonText = styled(Text)<{ valid?: boolean }>`
  font-weight: 700;
  color: ${({ valid, theme }) =>
    valid ? theme.colors.white : theme.colors.lightGray};
`;

export const FlatListCon = styled(FlatList).attrs({
  contentContainerStyle: {},
})``;

export const StyledModal = styled(Modal)`
  flex: 1;
`;

export const ModalView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundCardColor};
  margin-top: 48px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.disabledTextColor};
`;

export const CloseButton = styled(Pressable)`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px;
  background-color: white;
  border-radius: 20px;
`;

export const CloseButtonText = styled(Text)`
  color: black;
  font-size: 16px;
`;

export const StyledImage = styled(Image)`
  width: 90%;
  height: 90%;
`;

export const PressAbleContainer = styled(Pressable)<{ isWidthShort?: boolean }>`
  position: relative;
  width: ${({ isWidthShort }) => (isWidthShort ? 30 : 100)}%;
  height: 120px;
  background-color: ${({ theme }) => theme.colors.backgroundCardColor};
  border-radius: 8px;
`;

export const CrossIconContainer = styled(Pressable)`
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.errorText};
  border-radius: 20px;
`;

export const PhoneNumberFieldView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.iceWindDale};
`;

export const CountryCodeInput = styled(View)`
  flex: 0.3;
`;

export const NumberInput = styled(View)`
  flex: 0.7;
`;

export const DialCodeDropDownView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 8px;
`;
export const DialCodeText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
`;
export const ImageView = styled(Image)`
  height: 16px;
  width: 16px;
`;
export const SelectedFlagView = styled(View)`
  margin-left: 8px;
`;
export const ErrorText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.error};
  padding-left: 4px;
`;
