import React from 'react';
import '@assets/images/index';
import {
  HeaderWithTextContainer,
  TextInHeader,
  IconCon,
  HeaderTextCon,
} from './TitleWithButton.styles';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TitleWithButtonProps } from './TitleWithButton.props';
import Back from '@atoms/Illustrations/Back';
import { useAppTheme } from '@constants/theme';

const TitleWithButton: React.FC<TitleWithButtonProps> = ({
  text,
  onBackPress,
}) => {
  const { colors } = useAppTheme();
  const onBackPressed = () => {
    if (onBackPress) {
      onBackPress();
    } else router.back();
  };
  const { top } = useSafeAreaInsets();
  return (
    <HeaderWithTextContainer top={top}>
      <IconCon>
        <Pressable onPress={() => onBackPressed()}>
          <Back color={colors.black} />
        </Pressable>
      </IconCon>
      {!!text && (
        <HeaderTextCon>
          <TextInHeader variant="SF-Pro-Display-Semibold_600">
            {text}
          </TextInHeader>
        </HeaderTextCon>
      )}
    </HeaderWithTextContainer>
  );
};
export default TitleWithButton;
