import Text from '@atoms/Text/Text';
import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { FlatList, Pressable } from 'react-native';

export const PickerContainer = styled(Pressable)`
  background-color: ${({ theme }) => theme.colors.white};
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.christmasSilver};
  border-style: dashed;
  margin-top: 4px;
  border-radius: 10px;
`;
export const AddIconButton = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 0px 16px 24px;
  gap: 8px;
`;

export const UploadText = styled(Text)<{ textColor?: string }>`
  font-size: 14px;
  color: ${({ theme, textColor }) => textColor || theme.colors.black};
  text-align: center;
`;
export const FlatListCon = styled(FlatList).attrs({
  contentContainerStyle: {},
})``;
export const DocumentView = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;
export const PressAbleContainer = styled(Pressable)`
  position: relative;
  width: 100%;
  height: 60px;
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
export const DocumentDetailContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
export const DocumentInfoContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;
export const DocumentName = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textDark};
`;
export const UploadAnotherDocumentText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.blueChaos};
`;
