import { useAppTheme } from '@constants/theme';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import UserDetailCard from '@organisms/UserDetailCard/UserDetailCard';
import { UserDetailCardProps } from '@organisms/UserDetailCard/UserDetailCard.props';
import {
  deleteUserAction,
  getAssignUserListAction,
  getUserListAction,
} from '@redux/actions/user';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';
import {
  CountsText,
  HeadingText,
  HeadingView,
  LoaderView,
  NoDataFoundText,
  NoLeadsFoundContainer,
} from './tabs.style';
import { ActivityIndicator } from 'react-native-paper';
import Loader from '@atoms/Loader/Loader';
import { Spacer } from '@atoms/common/common.styles';
import SearchFilter from '@molecules/Search/Search';

const ButtonSize = 40;

const Users = () => {
  const { t: ts } = useTranslation('drawer');
  const { t } = useTranslation('modalText');
  const { t: td } = useTranslation('dashBoard');
  const [showModal, setShowModal] = useState(false);
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const userList = useSelector((state: RootState) => state.user?.userList);
  const [loadingStatus, setLoadingStatus] = useState<
    'NONE' | 'DELETE' | 'MORE' | 'REFRESH'
  >('NONE');
  const [deleteUserId, setDeleteUserId] = useState(0);
  const [userSearch, setUserSearch] = useState('');

  const handleDeleteUser = async () => {
    try {
      setLoadingStatus('DELETE');
      const response = await dispatch(
        deleteUserAction({ user_id: deleteUserId }),
      ).unwrap();
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });
      await dispatch(getAssignUserListAction());
    } catch (error: any) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setShowModal(false);
    setLoadingStatus('NONE');
  };

  const handleEdit = (slug: string | number) => {
    router.navigate(`/(protected)/add-user/${slug}`);
  };

  const handleGetMoreUserData = async () => {
    if (userList?.currentPage !== userList?.lastPage) {
      try {
        setLoadingStatus('MORE');
        await dispatch(
          getUserListAction({ page: userList?.currentPage + 1 }),
        ).unwrap();
      } catch (error: any) {
        toast.show(error, {
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Error,
          },
        });
      }
      setLoadingStatus('NONE');
    }
  };

  const onRefreshUserList = async () => {
    try {
      setLoadingStatus('REFRESH');
      await dispatch(getUserListAction({}));
    } catch (error) {
      console.log(error);
    }
    setLoadingStatus('NONE');
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
        onDelete={handleDeleteUser}
        onEdit={() => handleEdit(item?.id)}
        data={item}
        onChangeModalState={(value) => setShowModal(value)}
        showModal={showModal}
        loading={loadingStatus === 'DELETE'}
        onChangeDeleteId={(id) => setDeleteUserId(id)}
      />
      <Spacer size={12} />
    </>
  );

  if (loadingStatus === 'NONE' && !userList?.users?.length) {
    return (
      <ScreenTemplate>
        <LoaderView>
          <ActivityIndicator color={colors.primaryColor} />
        </LoaderView>
      </ScreenTemplate>
    );
  }
  const renderHeader = () => {
    return (
      <SearchFilter
        search={userSearch}
        setSearch={setUserSearch}
        handleSearch={() => console.log('search')}
      />
    );
  };

  return (
    <ScreenTemplate moreVisible>
      <HeadingView>
        <HeadingText>{ts('users')}</HeadingText>
        <CountsText>{`${userList?.total} ${
          userList?.total > 1 ? t('items') : t('item')
        }`}</CountsText>
      </HeadingView>
      {renderHeader()}
      {userList?.users?.length > 0 ? (
        <FlatList
          data={userList?.users}
          contentContainerStyle={{ paddingBottom: ButtonSize + 20 }}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderUser}
          showsVerticalScrollIndicator={false}
          onEndReached={handleGetMoreUserData}
          ListFooterComponent={
            loadingStatus === 'MORE' ? <Loader size={24} /> : null
          }
          refreshControl={
            <RefreshControl
              refreshing={loadingStatus === 'REFRESH'}
              onRefresh={onRefreshUserList}
              colors={[colors.primaryColor]}
            />
          }
        />
      ) : (
        <NoLeadsFoundContainer>
          <NoDataFoundText>{td('noUsersFound')}</NoDataFoundText>
        </NoLeadsFoundContainer>
      )}
    </ScreenTemplate>
  );
};

export default Users;
