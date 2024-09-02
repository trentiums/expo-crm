import Loader from '@atoms/Loader/Loader';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import {
  DashboardScreenContainer,
  NoDataFoundText,
  TitleText,
} from './tabs.style';
import { FlatList, Swipeable } from 'react-native-gesture-handler';
import { Spacer } from '@atoms/common/common.styles';
import ActionModal from '@molecules/ActionModal/ActionModal';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { useAppTheme } from '@constants/theme';
import {
  DashboardLeadList,
  LeadStageCountLeadList,
} from '@type/redux/slices/dashboard';
import DashboardLeadsCard from '@molecules/DashboardLeadsCard/DashboardLeadsCard';
import {
  dashboardLeadListAction,
  dashboardLeadStageCountAction,
} from '@redux/actions/dashboard';
import { setLeadsInformation } from '@redux/slices/leads';
import DashBoardLeadCard from '@organisms/DashBoardLeadCard/DashBoardLeadCard';
import moment from 'moment';
import { dateTimeFormate } from '@constants/common';
import { Pressable } from 'react-native';
import { ToastTypeProps } from '@molecules/Toast/Toast.props';
import { deleteLeadAction } from '@redux/actions/lead';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import Trash from '@atoms/Illustrations/Trash';
import React from 'react';
import { router } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import Button from '@atoms/Button/Button';

const Dashboard = () => {
  const { colors } = useAppTheme();
  const { t } = useTranslation('dashBoard');
  const { t: tm } = useTranslation('modalText');
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [deletedId, setDeletedId] = useState<number | undefined>();
  const [openSwipeAbleRef, setOpenSwipeAbleRef] =
    useState<RefObject<Swipeable> | null>(null);
  const dashboardLeadList = useSelector((state: RootState) => state.dashboard);
  const [leadListData, setLeadListData] = useState<DashboardLeadList[]>(
    dashboardLeadList.leadList,
  );
  const dispatch = useAppDispatch();
  const handelFetchLead = async () => {
    setLoading(true);
    await dispatch(dashboardLeadListAction({}));
    await dispatch(dashboardLeadStageCountAction());
    setLoading(false);
  };
  const handleMoreData = async () => {
    if (
      dashboardLeadList &&
      dashboardLeadList?.lastPage > 1 &&
      dashboardLeadList?.currentPage !== dashboardLeadList?.lastPage
    ) {
      await dispatch(
        dashboardLeadListAction({
          page: dashboardLeadList?.currentPage + 1,
        }),
      );
    }
  };
  useFocusEffect(
    useCallback(() => {
      handelFetchLead();
    }, []),
  );
  useEffect(() => {
    handelFetchLead();
  }, []);

  useEffect(() => {
    setLeadListData(dashboardLeadList.leadList);
  }, [dashboardLeadList]);

  const handleDelete = (id: number) => {
    setShowModal(true);
    setDeletedId(id);
  };

  const closeSwipeAble = () => {
    if (openSwipeAbleRef && openSwipeAbleRef.current) {
      openSwipeAbleRef.current.close();
    }
  };

  const onDeleteActionPress = async () => {
    setDeleteLoading(true);
    try {
      const response = await dispatch(
        deleteLeadAction({ lead_id: deletedId }),
      ).unwrap();
      toast.show(response?.message, {
        type: 'customToast',
        data: {
          type: ToastTypeProps.Success,
        },
      });
      await handelFetchLead();
    } catch (error: any) {
      toast.show(error, {
        type: 'customToast',
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    closeSwipeAble();
    setDeleteLoading(false);
    setShowModal(false);
  };
  const setSwipeAbleRef = (ref: RefObject<Swipeable>) => {
    setOpenSwipeAbleRef(ref);
  };

  const RenderComponent = ({
    item,
    index,
  }: {
    item: DashboardLeadList;
    index: number;
  }) => (
    <Pressable
      key={`${item.id}-${index}`}
      onPress={() => {
        dispatch(setLeadsInformation());
        router.navigate(`/(protected)/add-lead/${item?.id}`);
      }}>
      <DashBoardLeadCard
        key={`${item.id}-${index}`}
        onDelete={() => handleDelete(item?.id)}
        whatsAppNumber={item.phone}
        phoneNumber={item.phone}
        title={item.name}
        mailID={item.email}
        dateTime={moment(item.createdAt).format(dateTimeFormate)}
        closeSwipeAble={closeSwipeAble}
        setSwipeAbleRef={setSwipeAbleRef}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        cardIndex={index}
      />
    </Pressable>
  );

  const dashboardCardColors = [
    colors.primaryColor,
    colors.white,
    colors.lightYellow,
    colors.lightBlue,
  ];

  const renderProfileGameHistoryCard = ({
    item,
    index,
  }: {
    item: LeadStageCountLeadList;
    index: number;
  }) => (
    <>
      <DashboardLeadsCard
        title={item.name}
        leads={item.leadCount}
        scoreColor={dashboardCardColors[index % dashboardCardColors.length]}
        key={`${item?.name?.toString()} - ${index}`}
      />
      <Spacer size={index % 2 === 0 ? 16 : 0} />
    </>
  );

  return (
    <ScreenTemplate>
      {loading && dashboardLeadList.leadStageCount.length === 0 ? (
        <Loader />
      ) : (
        <DashboardScreenContainer
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <FlatList
            data={dashboardLeadList.leadStageCount}
            renderItem={renderProfileGameHistoryCard}
            keyExtractor={(item, index) =>
              ` ${item.name.toString()} - ${index}`
            }
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
          <Spacer size={16} />
          <TitleText>{t('newLeads')}</TitleText>
          <Spacer size={16} />
          {leadListData?.length > 0 ? (
            <FlatList
              data={leadListData}
              renderItem={RenderComponent}
              keyExtractor={(item, index) =>
                ` ${item.name.toString()} - ${index}`
              }
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onEndReached={() => handleMoreData()}
            />
          ) : (
            <>
              <NoDataFoundText>{t('noLeadsDashboard')}</NoDataFoundText>
              <Spacer size={12} />
              <Button
                mode="contained"
                buttonColor={colors.primaryColor}
                textColor={colors.white}
                onPress={() => router.navigate(`./addLead`)}
                uppercase={false}>
                {t('addLeads')}
              </Button>
            </>
          )}
          <Spacer size={16} />
          {showModal && (
            <ActionModal
              isModal
              onBackdropPress={() => {
                setShowModal(false);
                closeSwipeAble();
              }}
              heading={tm('discardMedia')}
              description={tm('disCardDescription')}
              label={tm('yesDiscard')}
              actionType={Actions.delete}
              actiontext={tm('cancel')}
              onCancelPress={() => {
                setShowModal(false);
                closeSwipeAble();
              }}
              onActionPress={() => onDeleteActionPress()}
              icon={<Trash color={colors?.deleteColor} />}
              loading={deleteLoading}
            />
          )}
        </DashboardScreenContainer>
      )}
    </ScreenTemplate>
  );
};

export default Dashboard;
