import { Flexed, Spacer } from '@atoms/common/common.styles';
import Text from '@atoms/Text/Text';
import { useAppDispatch, useSelector } from '@redux/store';
import { router, usePathname } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Drawer } from 'react-native-paper';
import { Linking } from 'react-native';
import { styled } from '@utils/styled';
import { logoutUserAction } from '@redux/actions/auth';
import { useTranslation } from 'react-i18next';
import { DrawerSafeAreaView, VersionText } from './DrawerContent.styles';

const BoldCenteredText = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  margin-top: 16px;
  margin-bottom: 10px;
  padding-left: 24px;
`;

const CenteredText = styled(Text)`
  text-align: center;
`;

const RedText = styled(Text)`
  color: ${({ theme }) => theme.colors.error};
  font-size: 16px;
`;

const BlueText = styled(Text)`
  color: dodgerblue;
`;

const DrawerContent = () => {
  const user = useSelector((state) => state.auth.user);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('drawer');

  return (
    <DrawerSafeAreaView>
      <Flexed>
        <BoldCenteredText>
          {t('welcome')} {user.name}
        </BoldCenteredText>
        <Flexed>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Drawer.Item
              label="Dashboard"
              active={pathname === '/dashboard'}
              onPress={() => {
                router.navigate('(tabs)/dashboard');
              }}
              icon="home"
            />
            <Drawer.Item
              label="Leads"
              active={pathname === '/leads'}
              onPress={() => {
                router.navigate('(tabs)/leads');
              }}
              icon="lead-pencil"
            />
            {user.userRole !== 3 && (
              <Drawer.Item
                label="Users"
                active={pathname === '/users'}
                onPress={() => {
                  router.navigate('(tabs)/users');
                }}
                icon="account-group"
              />
            )}
            <Drawer.Item
              label="Products"
              active={pathname === '/products'}
              onPress={() => {
                router.navigate('/products');
              }}
              icon="shopping-outline"
            />
          </ScrollView>
        </Flexed>
        <Button
          onPress={async () => {
            try {
              await dispatch(logoutUserAction()).unwrap();
              router.replace('/(public)/login');
            } catch (error) {
              console.log('error: ', error);
            }
          }}>
          <RedText>{t('logout')}</RedText>
        </Button>
        <Spacer size={16} />
        <CenteredText>
          {t('poweredBy')}{' '}
          <BlueText
            onPress={() => Linking.openURL('https://www.trentiums.com')}>
            {t('trentiums')}
          </BlueText>
        </CenteredText>
        <Spacer size={4} />
        <VersionText>Version 1.0.0</VersionText>
      </Flexed>
    </DrawerSafeAreaView>
  );
};

export default DrawerContent;
