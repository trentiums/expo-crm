import View from '@atoms/View/View';
import { styled } from '@utils/styled';
import { Image } from 'react-native';

export const AddProductFormContainer = styled(View)``;
export const LoaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ImagePreviewShow = styled(Image)`
  height: 120px;
  width: 100%;
  border-radius: 8px;
`;

export const LoaderView = styled(View)`
  height: 100%;
  align-items: center;
  justify-content: center;
`;
export const FormsView = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 24px;
`;
