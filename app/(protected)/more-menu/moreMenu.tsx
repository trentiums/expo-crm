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
import { Spacer } from '@atoms/common/common.styles';
import View from '@atoms/View/View';
import Switch from '@atoms/Switch/Switch';
import { Pressable } from 'react-native';
import { changeTheme, ThemeEnum } from '@redux/slices/theme';
import { RootState, useAppDispatch, useSelector } from '@redux/store';

const MoreMenu = () => {
  const { t } = useTranslation('screenTitle');
  const { t: tm } = useTranslation('moreMenu');
  const { top } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { currentTheme } = useSelector((state: RootState) => state.theme);

  const handleChangeTheme = () => {
    if (currentTheme === ThemeEnum.light) {
      dispatch(changeTheme(ThemeEnum.dark));
    } else if (currentTheme === ThemeEnum.dark) {
      dispatch(changeTheme(ThemeEnum.light));
    }
  };

  const switchTheme = () => {
    return (
      <Switch
        toggle={currentTheme !== ThemeEnum.light}
        onToggle={handleChangeTheme}
      />
    );
  };

  const changeLanguage = () => {
    return (
      <Pressable>
        <LanguageText>{tm('english')}</LanguageText>
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
    },
    {
      label: 'changePassword',
      icon: <LockIcon />,
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
        handlePress={() => console.log('MenuOptionItem')}
        icon={item.icon}
        label={tm(`${item.label}`)}
        key={`${item.label}-${index}`}
        rightContainer={item.rightContainer}
      />
    );
  };

  return (
    <ScreenTemplate title={t('moreMenu')}>
      <MainMenuContainer top={top}>
        <View>
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
        </View>
      </MainMenuContainer>
    </ScreenTemplate>
  );
};

export default MoreMenu;
