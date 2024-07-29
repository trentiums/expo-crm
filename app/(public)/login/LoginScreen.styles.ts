import Text from "@atoms/Text/Text";
import { styled } from "@utils/styled";
import { Image, View } from "react-native";

export const Container = styled(View)`
  flex: 1;
  padding: 24px;
`;

export const ImageView = styled(Image)`
  height: 135px;
  width: 135px;
  display: flex;
  align-self: center;
`;

export const IntroText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 32px;
  font-weight: 700;
  text-align: center;
`;
