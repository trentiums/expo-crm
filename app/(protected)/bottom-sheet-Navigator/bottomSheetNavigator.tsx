import React, { useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomSheetAddOption from '../bottom-sheet-Navigator-Screen/addOptions';
import ScreenTwo from '../bottom-sheet-Navigator-Screen/screenTwo';
import {
  BottomSheetCustomHeaderProps,
  BottomSheetNavigatorProps,
} from './bottomSheetNavigator.props';
import { Pressable } from 'react-native';
import BottomSheetClose from '@atoms/Illustrations/BottomSheetClose';
import ArrowLeft from '@atoms/Illustrations/ArrowLeft';
import {
  BottomSheetHeaderCon,
  BottomSheetHeaderTitle,
} from './bottomSheetNavigator.style';
import { useAppTheme } from '@constants/theme';

const Stack = createNativeStackNavigator();

const BottomSheetNavigator: React.FC<BottomSheetNavigatorProps> = ({
  initialRouteName,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['25%', '50%']; // Use static snap points here
  const { colors } = useAppTheme();

  const CustomHeader = ({
    title,
    onClose,
    showBackButton,
    onBackPress,
  }: BottomSheetCustomHeaderProps) => (
    <BottomSheetHeaderCon>
      {showBackButton && (
        <Pressable onPress={onBackPress}>
          <ArrowLeft color={colors.black} />
        </Pressable>
      )}
      <BottomSheetHeaderTitle>{title}</BottomSheetHeaderTitle>
      <Pressable onPress={onClose}>
        <BottomSheetClose />
      </Pressable>
    </BottomSheetHeaderCon>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleComponent={null}
      onClose={() => bottomSheetRef.current?.close()}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            name="BottomSheetAddOption"
            options={() => ({
              header: () => (
                <CustomHeader
                  title="Choose option to add"
                  onClose={() => bottomSheetRef.current?.close()}
                />
              ),
            })}
            component={BottomSheetAddOption}
          />
          <Stack.Screen
            name="ScreenTwo"
            options={({ navigation }) => ({
              header: () => (
                <CustomHeader
                  title="Choose option to add"
                  onClose={() => bottomSheetRef.current?.close()}
                  showBackButton={true}
                  onBackPress={() => navigation.goBack()}
                />
              ),
            })}
            component={ScreenTwo}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheet>
  );
};

export default BottomSheetNavigator;
