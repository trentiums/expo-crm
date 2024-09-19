import { useAppTheme } from '@constants/theme';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import UserDetailCard from '@organisms/UserDetailCard/UserDetailCard';
import { UserDetailCardProps } from '@organisms/UserDetailCard/UserDetailCard.props';
import { getUserListAction } from '@redux/actions/user';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';
import {
  CountsText,
  HeadingText,
  HeadingView,
  LoaderContainer,
} from '../tabs.style';
import { ActivityIndicator } from 'react-native-paper';
import Loader from '@atoms/Loader/Loader';
import { Spacer } from '@atoms/common/common.styles';
import SearchFilter from '@molecules/Search/Search';
import { LoadingStatus } from '../../(public)/login/LoginScreen.props';
import NoDataAvailable from '@molecules/NoDataAvailable/NoDataAvailable';

const ButtonSize = 40;

const Users = () => {
  const { t: ts } = useTranslation('drawer');
  const { t } = useTranslation('modalText');
  const { t: td } = useTranslation('dashBoard');
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const userList = useSelector((state: RootState) => state.user?.userList);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(
    LoadingStatus.NONE,
  );
  const [userSearch, setUserSearch] = useState('');

  const handleGetMoreUserData = async () => {
    if (userList?.currentPage !== userList?.lastPage) {
      try {
        setLoadingStatus(LoadingStatus.MORE);
        await dispatch(
          getUserListAction({
            page: userList.currentPage + 1,
            search: userSearch,
          }),
        ).unwrap();
      } catch (error: any) {
        toast.show(error, {
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Error,
          },
        });
      }
      setLoadingStatus(LoadingStatus.NONE);
    }
  };

  const onRefreshUserList = async () => {
    try {
      setLoadingStatus(LoadingStatus.REFRESH);
      await dispatch(getUserListAction({}));
    } catch (error) {
      console.log(error);
    }
    setLoadingStatus(LoadingStatus.NONE);
  };

  const renderUser = ({
    item,
    index,
  }: {
    item: UserDetailCardProps;
    index: number;
  }) => (
    <>
      <UserDetailCard
        key={`${item.id}-${index}`}
        data={item}
        assignLeadOnDelete={true}
      />
      <Spacer size={12} />
    </>
  );

  const handleSearch = async () => {
    try {
      setLoadingStatus(LoadingStatus.SCREEN);
      await dispatch(getUserListAction({ search: userSearch }));
    } catch (error) {
      console.log(error);
    }
    setLoadingStatus(LoadingStatus.NONE);
  };
  const renderHeader = () => {
    return (
      <SearchFilter
        search={userSearch}
        setSearch={setUserSearch}
        handleSearch={handleSearch}
      />
    );
  };

  return (
    <ScreenTemplate moreVisible>
      <HeadingView>
        <HeadingText>{ts('users')}</HeadingText>
        <CountsText>
          {t('itemWithCount', { count: userList?.total })}
        </CountsText>
      </HeadingView>
      {renderHeader()}
      <>
        {loadingStatus === LoadingStatus.SCREEN ? (
          <LoaderContainer>
            <ActivityIndicator color={colors.blueChaos} />
          </LoaderContainer>
        ) : (
          <>
            {userList?.users?.length > 0 ? (
              <FlatList
                data={userList.users}
                contentContainerStyle={{ paddingBottom: ButtonSize + 20 }}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={renderUser}
                showsVerticalScrollIndicator={false}
                onEndReached={handleGetMoreUserData}
                ListFooterComponent={
                  loadingStatus === LoadingStatus.MORE ? (
                    <Loader size={24} />
                  ) : null
                }
                refreshControl={
                  <RefreshControl
                    refreshing={loadingStatus === LoadingStatus.REFRESH}
                    onRefresh={onRefreshUserList}
                    colors={[colors.primaryColor]}
                  />
                }
              />
            ) : (
              <NoDataAvailable text={td('noUsersFound')} />
            )}
          </>
        )}
      </>
    </ScreenTemplate>
  );
};

export default Users;
