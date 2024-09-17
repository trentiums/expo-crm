import Text from '@atoms/Text/Text';
import { styled } from '@utils/styled';
import { Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Container = styled(View)`
  flex: 0.6;
`;

export const ImageView = styled(Image)`
  display: flex;
  align-self: center;
`;

export const ForgotText = styled(Text)`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 36px;
  font-weight: 700;
  text-align: center;
`;
export const ForgotScreenContainer = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
export const ForgotFormContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 24px;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const ForgotScrollView = styled(KeyboardAwareScrollView).attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
}))``;
