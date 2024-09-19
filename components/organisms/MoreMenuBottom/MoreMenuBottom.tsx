import React from 'react';
import {
  LogoutBtn,
  LogoutContainer,
  LogoutText,
  MenuBottomContainer,
  NormalText,
  PolicyContainer,
  PolicyText,
  VersionText,
} from './MoreMenuBottom.styles';
import { useAppTheme } from '@constants/theme';
import { useTranslation } from 'react-i18next';
import LogoutIcon from '@atoms/Illustrations/Logout';
import { Spacer } from '@atoms/common/common.styles';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import { logoutUserAction } from '@redux/actions/auth';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { Linking, Pressable } from 'react-native';

const MoreMenuBottom = () => {
  const { colors } = useAppTheme();
  const { t } = useTranslation('moreMenu');
  const dispatch = useAppDispatch();
  const settingList = useSelector(
    (state: RootState) => state?.general.settings,
  );

  const handleLogout = () => {
    dispatch(logoutUserAction());
    router.navigate('/(public)/login');
  };

  const appVersion = Constants.expoConfig?.version || t('notAvailable');
  return (
    <MenuBottomContainer>
      <VersionText>
        {t('version')} {appVersion}
      </VersionText>
      <Spacer size={20} />
      <LogoutBtn onPress={handleLogout} textColor={colors.englishHolly}>
        <LogoutContainer>
          <LogoutIcon />
          <Spacer size={5} />
          <LogoutText>{t('logout')}</LogoutText>
        </LogoutContainer>
      </LogoutBtn>
      <Spacer size={20} />
      <PolicyContainer>
        <Pressable
          onPress={() => Linking.openURL(settingList?.termsConditionPageUrl)}>
          <PolicyText>{t('termsOfService')}</PolicyText>
        </Pressable>
        <Spacer size={5} />
        <NormalText>{t('and')}</NormalText>
        <Spacer size={5} />
        <Pressable
          onPress={() => Linking.openURL(settingList?.privacyPolicyPageUrl)}>
          <PolicyText>{t('privacyPolicy')}</PolicyText>
        </Pressable>
      </PolicyContainer>
    </MenuBottomContainer>
  );
};

export default MoreMenuBottom;
