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
import moment from 'moment';
import React, { RefObject, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, View } from 'react-native';
import { RefreshControl, Swipeable } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';
import {
  LoaderView,
  NoDataFoundText,
  NoLeadsFoundContainer,
} from './tabs.style';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import Loader from '@atoms/Loader/Loader';
import ActionModal from '@molecules/ActionModal/ActionModal';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import TrashIcon from '@atoms/Illustrations/Trash';
import { ActionBtnView, SeparatorComponent } from './drawer.style';

const ButtonSize = 40;

const Users = () => {
  const { t } = useTranslation('modalText');
  const { t: td } = useTranslation('dashBoard');
  const [showModal, setShowModal] = useState(false);
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const userList = useSelector((state: RootState) => state.user?.userList);
  const [openSwipeAbleRef, setOpenSwipeAbleRef] =
    useState<RefObject<Swipeable> | null>(null);
  const [deleteId, setDeleteId] = useState<number | string>(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (slug: string | number) => {
    setShowModal(true);
    setDeleteId(slug);
  };

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
    setDeleteLoading(false);
    openSwipeAbleRef?.current?.close();
  };

  const handleEdit = (slug: string | number) => {
    router.navigate(`/(protected)/add-user/${slug}`);
  };

  const onDeleteActionPress = async () => {
    await handleDeleteUser();
    setShowModal(false);
  };

  const closeSwipeAble = () => {
    if (openSwipeAbleRef && openSwipeAbleRef.current) {
      openSwipeAbleRef.current.close();
    }
  };

  const setSwipeAbleRef = (ref: RefObject<Swipeable>) => {
    setOpenSwipeAbleRef(ref);
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
    <Pressable
      key={`${item.id}-${index}`}
      onPress={() => {
        console.log('pressCard', item.id);
      }}>
      <UserDetailCard
        key={`${item.id}-${index}`}
        onDelete={() => handleDelete(item?.id)}
        onEdit={() => handleEdit(item?.id)}
        mailID={item.email}
        title={item.name}
        dateTime={moment(item?.createdAt).format('DD MMM YYYY, hh:mm A')}
        closeSwipeAble={closeSwipeAble}
        setSwipeAbleRef={setSwipeAbleRef}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        cardIndex={index}
        id={0}
        cardImage={0}
        name={''}
        email={''}
        createdAt={''}
      />
    </Pressable>
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
  useEffect(() => {
    openSwipeAbleRef?.current?.close();
  }, []);
  const onAddButtonPress = () => {
    router.navigate(`/(protected)/add-user/add`);
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

  return (
    <ScreenTemplate>
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
          ItemSeparatorComponent={() => <SeparatorComponent />}
        />
      ) : (
        <NoLeadsFoundContainer>
          <NoDataFoundText>{td('noUsersFound')}</NoDataFoundText>
        </NoLeadsFoundContainer>
      )}
      {showModal && (
        <ActionModal
          isModal
          onBackdropPress={() => {
            setShowModal(false);
            closeSwipeAble();
          }}
          heading={t('discardMedia')}
          description={t('disCardDescription')}
          label={t('yesDiscard')}
          actionType={Actions.delete}
          actiontext={t('cancel')}
          onCancelPress={() => {
            setShowModal(false);
            closeSwipeAble();
          }}
          onActionPress={() => onDeleteActionPress()}
          icon={<TrashIcon color={colors?.deleteColor} />}
          loading={deleteLoading}
        />
      )}

      <ActionBtnView>
        <IconButton
          icon="plus"
          iconColor={colors.white}
          size={ButtonSize}
          containerColor={colors.primaryColor}
          onPress={onAddButtonPress}
        />
      </ActionBtnView>
    </ScreenTemplate>
  );
};

export default Users;
