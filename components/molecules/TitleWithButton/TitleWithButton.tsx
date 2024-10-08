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

const TitleWithButton: React.FC<TitleWithButtonProps> = ({
  text,
  onBackPress,
}) => {
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
          <Back />
        </Pressable>
      </IconCon>
      {!!text && (
        <HeaderTextCon>
          <TextInHeader>{text}</TextInHeader>
        </HeaderTextCon>
      )}
    </HeaderWithTextContainer>
  );
};
export default TitleWithButton;
