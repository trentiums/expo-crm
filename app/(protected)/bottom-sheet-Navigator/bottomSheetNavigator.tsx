import React, { useCallback, useRef, useState } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
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
  BottomSheetBackDropCon,
  BottomSheetHeaderCon,
  BottomSheetHeaderTitle,
} from './bottomSheetNavigator.style';
import { useAppTheme } from '@constants/theme';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

const BottomSheetNavigator: React.FC<BottomSheetNavigatorProps> = ({
  initialRouteName,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const snapPoints = ['20%', '50%'];
  const { colors } = useAppTheme();
  const { t } = useTranslation('bottomSheetNavigator');

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

  const handleSheetChange = useCallback((index: number) => {
    setIsSheetOpen(index >= 0);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => {
      return (
        <BottomSheetBackDropCon
          intensity={20}
          experimentalBlurMethod="dimezisBlurView"
          tint="dark"
          isSheetOpen={isSheetOpen}
        />
      );
    },
    [isSheetOpen],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}
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
                  title={t('ChooseOptionToAdd')}
                  onClose={() => bottomSheetRef.current?.close()}
                />
              ),
            })}
            component={BottomSheetAddOption}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheet>
  );
};

export default BottomSheetNavigator;
