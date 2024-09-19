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
import { Linking, Pressable } from 'react-native';
import { changeTheme, ThemeTypes } from '@redux/slices/theme';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import MoreMenuBottom from '@organisms/MoreMenuBottom/MoreMenuBottom';
import BottomSheetNavigator from '@organisms/bottom-sheet-Navigator/bottomSheetNavigator';
import { UserRole } from '@type/api/auth';
import { deleteAccountAction } from '@redux/actions/user';
import ActionModal from '@molecules/ActionModal/ActionModal';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import TrashIcon from '@atoms/Illustrations/Trash';
import { useAppTheme } from '@constants/theme';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { useToast } from 'react-native-toast-notifications';

const MoreMenu = () => {
  const { t } = useTranslation('screenTitle');
  const { t: tm } = useTranslation('moreMenu');
  const { top } = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [visibleLanguageOptionSheet, setVisibleLanguageOptionSheet] =
    useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const { currentTheme } = useSelector((state: RootState) => state.theme);
  const userRole = useSelector((state: RootState) => state.auth.user.userRole);
  const currentLanguage = useSelector(
    (state: RootState) => state.auth.currentLanguage,
  );
  const settingList = useSelector(
    (state: RootState) => state?.general.settings,
  );

  const handleChangeTheme = () => {
    if (currentTheme === ThemeTypes.light) {
      dispatch(changeTheme(ThemeTypes.dark));
    } else if (currentTheme === ThemeTypes.dark) {
      dispatch(changeTheme(ThemeTypes.light));
    }
  };

  const onDeleteActionPress = async () => {
    try {
      setDeleteLoading(true);
      const response = await dispatch(deleteAccountAction()).unwrap();
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });
    } catch (error) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setDeleteLoading(false);
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
  const sendEmail = () => {
    const email = settingList?.contactEmail;

    if (!email) {
      toast.show(t('noEmail'), {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
      return;
    }
    const url = `mailto:${email}`;
    Linking.openURL(url);
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
    },
  ];

  const supportOptions = [
    {
      label: 'helpAndSupport',
      icon: <SupportAgentIcon />,
      onPress: sendEmail,
    },
    {
      label: 'feedback',
      icon: <FeedbackIcon />,
      onPress: sendEmail,
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
            {(userRole === UserRole.Admin ||
              userRole === UserRole.CompanyAdmin) && (
              <>
                <Spacer size={20} />
                <DividerContainer />
                <Spacer size={20} />
                <Pressable onPress={() => setDeleteShowModal(true)}>
                  <DeleteText variant="SF-Pro-Display-Semibold_600">
                    {tm('deleteAccount')}
                  </DeleteText>
                </Pressable>
              </>
            )}
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
      {deleteShowModal && (
        <ActionModal
          isModal
          onBackdropPress={() => {
            setDeleteShowModal(false);
          }}
          heading={tm('discardMedia')}
          description={tm('disCardDescription')}
          label={tm('yesDiscard')}
          actionType={Actions.delete}
          actiontext={tm('cancel')}
          onCancelPress={() => {
            setDeleteShowModal(false);
          }}
          onActionPress={() => onDeleteActionPress()}
          icon={<TrashIcon color={colors?.deleteColor} />}
          loading={deleteLoading}
        />
      )}
    </ScreenTemplate>
  );
};

export default MoreMenu;
