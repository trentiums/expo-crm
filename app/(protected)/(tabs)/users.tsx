import { useAppTheme } from '@constants/theme';
import { ToastTypeProps } from '@molecules/Toast/Toast.props';
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
  const [loading, setLoading] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [moreLoading, setMoreLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleDeleteUser = async () => {
    try {
      setDeleteLoading(true);
      const response = await dispatch(
        deleteUserAction({ user_id: deleteId }),
      ).unwrap();
      toast.show(response?.message, {
        type: 'customToast',
        data: {
          type: ToastTypeProps.Success,
        },
      });
      await dispatch(getAssignUserListAction());
    } catch (error: any) {
      toast.show(error, {
        type: 'customToast',
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setShowModal(false);
    setDeleteLoading(false);
  };

  const handleEdit = (slug: string | number) => {
    router.navigate(`/(protected)/add-user/${slug}`);
  };

  const handleGetMoreUserData = async () => {
    if (userList?.currentPage !== userList?.lastPage) {
      try {
        setMoreLoading(true);
        await dispatch(
          getUserListAction({ page: userList?.currentPage + 1 }),
        ).unwrap();
      } catch (error: any) {
        toast.show(error, {
          type: 'customToast',
          data: {
            type: ToastTypeProps.Error,
          },
        });
      }
      setMoreLoading(false);
    }
  };

  const RenderComponent = ({
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
        setShowModal={setShowModal}
        showModal={showModal}
        loading={deleteLoading}
        setDeleteId={setDeleteId}
      />
      <Spacer size={12} />
    </>
  );
  const onRefreshUserList = async () => {
    try {
      setRefreshing(true);
      await dispatch(getUserListAction({}));
    } catch (error) {
      console.log(error);
    }
    setRefreshing(false);
  };

  if (loading) {
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
    <ScreenTemplate isDrawerBtn>
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
          renderItem={RenderComponent}
          showsVerticalScrollIndicator={false}
          onEndReached={handleGetMoreUserData}
          ListFooterComponent={moreLoading ? <Loader size={24} /> : null}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
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
