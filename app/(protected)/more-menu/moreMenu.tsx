import React, { useState } from 'react';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DeleteText,
  DividerContainer,
  LanguageText,
  MainMenuContainer,
  MenuOptionsFlatList,
  SettingText,
} from './moreMenu.style';
import DarkThemeIcon from '@atoms/Illustrations/DarkTheme';
import TranslateIcon from '@atoms/Illustrations/Translate';
import LockIcon from '@atoms/Illustrations/Lock';
import SupportAgentIcon from '@atoms/Illustrations/SupportAgent';
import FeedbackIcon from '@atoms/Illustrations/Feedback';
import { MenuOptionsItemProps } from '@molecules/MenuOptionItem/MenuOptionItem.props';
import MenuOptionItem from '@molecules/MenuOptionItem/MenuOptionItem';
import { Flexed, Spacer } from '@atoms/common/common.styles';
import View from '@atoms/View/View';
import Switch from '@atoms/Switch/Switch';
import { Pressable } from 'react-native';
import { changeTheme, ThemeTypes } from '@redux/slices/theme';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import MoreMenuBottom from '@organisms/MoreMenuBottom/MoreMenuBottom';
import BottomSheetNavigator from '@organisms/bottom-sheet-Navigator/bottomSheetNavigator';
import { router } from 'expo-router';

const MoreMenu = () => {
  const { t } = useTranslation('screenTitle');
  const { t: tm } = useTranslation('moreMenu');
  const { top } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [visibleLanguageOptionSheet, setVisibleLanguageOptionSheet] =
    useState(false);
  const { currentTheme } = useSelector((state: RootState) => state.theme);
  const currentLanguage = useSelector(
    (state: RootState) => state.auth.currentLanguage,
  );

  const handleChangeTheme = () => {
    if (currentTheme === ThemeTypes.light) {
      dispatch(changeTheme(ThemeTypes.dark));
    } else if (currentTheme === ThemeTypes.dark) {
      dispatch(changeTheme(ThemeTypes.light));
    }
  };

  const handleLanguageBottomSheet = () => {
    setVisibleLanguageOptionSheet(!visibleLanguageOptionSheet);
  };

  const switchTheme = () => {
    return (
      <Switch
        toggle={currentTheme !== ThemeTypes.light}
        onToggle={handleChangeTheme}
      />
    );
  };

  const changeLanguage = () => {
    return (
      <Pressable>
        <LanguageText>{currentLanguage.name}</LanguageText>
      </Pressable>
    );
  };

  const menuOptions = [
    {
      label: 'darkTheme',
      icon: <DarkThemeIcon />,
      rightContainer: switchTheme,
    },
    {
      label: 'changeLanguage',
      icon: <TranslateIcon />,
      rightContainer: changeLanguage,
      onPress: handleLanguageBottomSheet,
    },
    {
      label: 'changePassword',
      icon: <LockIcon />,
      onPress: () =>
        router.navigate('/(protected)/change-password/changePassword'),
    },
  ];

  const supportOptions = [
    {
      label: 'helpAndSupport',
      icon: <SupportAgentIcon />,
    },
    {
      label: 'feedback',
      icon: <FeedbackIcon />,
    },
  ];

  const renderMenuOptions = ({
    item,
    index,
  }: {
    item: MenuOptionsItemProps;
    index: number;
  }) => {
    return (
      <MenuOptionItem
        handlePress={() => item.onPress?.()}
        icon={item.icon}
        label={tm(`${item.label}`)}
        key={`${item.label}-${index}`}
        rightContainer={item.rightContainer}
      />
    );
  };

  return (
    <ScreenTemplate title={t('moreMenu')}>
      <MainMenuContainer spacing={top}>
        <Flexed>
          <View>
            <SettingText>{tm('setting')}</SettingText>
            <Spacer size={20} />
            <MenuOptionsFlatList
              data={menuOptions}
              keyExtractor={(item: MenuOptionsItemProps, index: number) =>
                `${item.label}-${index}`
              }
              renderItem={renderMenuOptions}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
            <Spacer size={20} />
            <DividerContainer />
            <Spacer size={20} />
            <MenuOptionsFlatList
              data={supportOptions}
              keyExtractor={(item: MenuOptionsItemProps, index: number) =>
                `${item.label}-${index}`
              }
              renderItem={renderMenuOptions}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
            <Spacer size={20} />
            <DividerContainer />
            <Spacer size={20} />
            <Pressable>
              <DeleteText>{tm('deleteAccount')}</DeleteText>
            </Pressable>
          </View>
        </Flexed>
        <MoreMenuBottom />
        <Spacer size={20} />
      </MainMenuContainer>
      {visibleLanguageOptionSheet && (
        <BottomSheetNavigator
          initialRouteName="LanguageList"
          onClosePress={handleLanguageBottomSheet}
        />
      )}
    </ScreenTemplate>
  );
};

export default MoreMenu;
