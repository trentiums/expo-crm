import React, { useCallback, useRef, useState } from 'react';
import { Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ScreenTwo from '../bottom-sheet-Navigator-Screen/screenTwo';

import BottomSheetAddOption from '../bottom-sheet-Navigator-Screen/addOptions';
import {
  BottomSheetBackDropCon,
  BottomSheetHeaderCon,
  BottomSheetHeaderTitle,
} from './bottomSheetNavigator.style';
import { useTranslation } from 'react-i18next';
import {
  BottomSheetCustomHeaderProps,
  BottomSheetNavigatorProps,
} from './bottomSheetNavigator.props';
import ArrowLeft from '@atoms/Illustrations/ArrowLeft';
import { useAppTheme } from '@constants/theme';
import BottomSheetClose from '@atoms/Illustrations/BottomSheetClose';

const Stack = createNativeStackNavigator();

const BottomSheetNavigator: React.FC<BottomSheetNavigatorProps> = ({
  initialRouteName,
  onClosePress,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [snapPoints, setSnapPoints] = useState(['50%', '90%']); // Default snap points
  const [isSheetOpen, setIsSheetOpen] = useState(false);
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

  const renderBackdrop = useCallback(() => {
    return (
      <BottomSheetBackDropCon
        intensity={20}
        // experimentalBlurMethod="dimezisBlurView"
        tint="dark"
        isSheetOpen={isSheetOpen}
      />
    );
  }, [isSheetOpen]);

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
    onClosePress?.();
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleComponent={null}
      onClose={() => handleClosePress()}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            name="BottomSheetAddOption"
            options={() => ({
              header: () => (
                <CustomHeader
                  title={t('ChooseOptionToAdd')}
                  onClose={() => handleClosePress()}
                />
              ),
            })}>
            {(props) => (
              <BottomSheetAddOption {...props} setSnapPoints={setSnapPoints} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheet>
  );
};

export default BottomSheetNavigator;
