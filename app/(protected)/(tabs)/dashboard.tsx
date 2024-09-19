import Loader from '@atoms/Loader/Loader';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import {
  DashboardFilterView,
  DashboardScreenContainer,
  GreetingText,
  DividerContainer,
  NameText,
  NoDataFoundText,
  TitleText,
} from '../tabs.style';
import { FlatList } from 'react-native-gesture-handler';
import { Spacer } from '@atoms/common/common.styles';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@constants/theme';
import {
  DashboardAdminLeadsProps,
  DashboardLeadsProps,
} from '@type/redux/slices/dashboard';
import {
  dashboardAdminLeadListAction,
  dashboardLeadListAction,
  dashboardLeadStageCountAction,
} from '@redux/actions/dashboard';
import { setLeadsInformation } from '@redux/slices/leads';
import DashBoardLeadCard from '@organisms/DashBoardLeadCard/DashBoardLeadCard';
import { Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import Button from '@atoms/Button/Button';
import LeadsProgressChart from '@organisms/LeadsProgressChart/LeadsProgressChart';
import CompanyDashboardCard from '@molecules/CompanyDashboardCard/CompanyDashboardCard';
import QuickFilter from '@molecules/QuickFilter/QuickFilter';
import NoDataAvailable from '@molecules/NoDataAvailable/NoDataAvailable';
import { UserRole } from '@type/api/auth';
import BottomSheetNavigator from '@organisms/bottom-sheet-Navigator/bottomSheetNavigator';
import { dashboardQuickFilters } from '@utils/constant';

const Dashboard = () => {
  const { colors } = useAppTheme();
  const { t } = useTranslation('dashBoard');
  const { t: tm } = useTranslation('modalText');
  const { t: tr } = useTranslation('drawer');
  const { t: tl } = useTranslation('leadStage');
  const user = useSelector((state: RootState) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const isAdmin =
    user.userRole === UserRole.Admin || user.userRole === UserRole.CompanyAdmin;
  const [deletedId, setDeletedId] = useState<number | undefined>();
  const dashboardLeadList = useSelector((state: RootState) => state.dashboard);
  const [leads, setLeads] = useState<
    DashboardLeadsProps[] | DashboardAdminLeadsProps[]
  >(dashboardLeadList.leadList);
  const [visibleLeadsSortFilterSheet, setVisibleLeadsSortFilterSheet] =
    useState(false);
  const [selectedSort, setSelectedSort] = useState(
    isAdmin && dashboardQuickFilters?.[0],
  );
  const dispatch = useAppDispatch();

  const handleChangeSortValue = (id) => {
    setSelectedSort(id);
  };
  const handelFetchLead = async () => {
    setLoading(true);
    //TODO: here we are passing order_by and sort_by static until leads UI comes in master
    if (isAdmin) {
      await dispatch(
        dashboardAdminLeadListAction({ order_by: 1, sort_order: 1 }),
      );
    } else {
      await dispatch(dashboardLeadListAction({}));
    }
    await dispatch(dashboardLeadStageCountAction());
    setLoading(false);
  };
  const chartColors = [
    colors.greenLight,
    colors.yellowLight,
    colors.redLight,
    colors.blueLight,
    colors.grayLight,
  ];

  const handleMoreData = async () => {
    if (
      dashboardLeadList &&
      dashboardLeadList?.lastPage > 1 &&
      dashboardLeadList?.currentPage !== dashboardLeadList?.lastPage
    ) {
      //TODO: here we are passing order_by and sort_by static until leads UI comes in master
      if (isAdmin) {
        await dispatch(
          dashboardAdminLeadListAction({
            order_by: 1,
            sort_order: 1,
            page: dashboardLeadList?.currentPage + 1,
          }),
        );
      } else {
        await dispatch(
          dashboardLeadListAction({
            page: dashboardLeadList?.currentPage + 1,
          }),
        );
      }
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
    setLeads(dashboardLeadList.leadList);
  }, [dashboardLeadList]);

  const handleDelete = (id: number) => {
    setShowModal(true);
    setDeletedId(id);
  };

  const createLeadsArray = (lead, index) => {
    return [
      {
        title: tl('initial'),
        value: lead.initial,
        bgColor: colors.greenLight,
        color: colors.green,
      },
      {
        title: tl('proposed'),
        value: lead.proposal,
        bgColor: colors.yellowLight,
        color: colors.yellow,
      },
      {
        title: tl('negotiation'),
        value: lead.negotiation,
        bgColor: colors.redLight,
        color: colors.red,
      },

      {
        title: tl('closedWon'),
        value: lead.closedWon,
        bgColor: colors.blueLight,
        color: colors.blue,
      },
      {
        title: tl('closedLost'),
        value: lead.closedLost,
        bgColor: colors.grayLight,
        color: colors.englishHolly,
      },
    ];
  };
  const renderLeads = ({
    lead,
    index,
  }: {
    lead: DashboardLeadsProps & DashboardAdminLeadsProps;
    index: number;
  }) => (
    <>
      {user.userRole === UserRole.Admin ||
      user.userRole === UserRole.CompanyAdmin ? (
        <>
          <CompanyDashboardCard
            leads={createLeadsArray(lead, index)}
            name={lead.name}
            leadsCount={lead?.total}
          />
          <Spacer size={16} />
        </>
      ) : (
        <Pressable
          key={`${lead?.id}-${index}`}
          onPress={() => {
            dispatch(setLeadsInformation());
            router.navigate(`/(protected)/add-lead/${lead?.id}`);
          }}>
          <DashBoardLeadCard
            key={`${lead?.id}-${index}`}
            onDelete={() => handleDelete(lead?.id)}
            leadData={lead}
            isSocialMediaVisible
          />
        </Pressable>
      )}
    </>
  );
  const handleVisibleLeadsSortFilter = () => {
    setVisibleLeadsSortFilterSheet(true);
  };
  const handleCloseVisibleSortFilter = () => {
    setVisibleLeadsSortFilterSheet(false);
  };
  return (
    <ScreenTemplate moreVisible>
      {loading && dashboardLeadList.leadStageCount.length === 0 ? (
        <Loader />
      ) : (
        <>
          <GreetingText>{tr('welcome')}</GreetingText>
          <NameText>{user?.name}</NameText>
          <Spacer size={16} />
          {dashboardLeadList.leadStageCount?.every(
            (item) => item.leadCount === 0,
          ) ? (
            <NoDataAvailable
              text={t('noLeadsTitle')}
              description={t('noLeadsDesc')}
            />
          ) : (
            <DashboardScreenContainer
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <LeadsProgressChart
                leads={dashboardLeadList.leadStageCount?.map((item, index) => {
                  return {
                    label: item?.name,
                    progress: item?.leadCount,
                    color: chartColors[index],
                  };
                })}
              />
              <Spacer size={16} />
              <TitleText>{t('newLeads')}</TitleText>
              <Spacer size={16} />
              <DashboardFilterView>
                <DividerContainer />
                <QuickFilter
                  filterTitle={tr('leadsCount')}
                  filterType={tr('sortBy')}
                  onFilterPress={handleVisibleLeadsSortFilter}
                />
              </DashboardFilterView>
              <Spacer size={16} />
              {leads?.length > 0 ? (
                <FlatList
                  data={leads}
                  renderItem={({ item: lead, index }) =>
                    renderLeads({ lead, index })
                  }
                  keyExtractor={(lead, index) =>
                    `${lead.name?.toString()} - ${index}`
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

              <Spacer size={50} />
            </DashboardScreenContainer>
          )}
        </>
      )}
      {visibleLeadsSortFilterSheet && (
        <BottomSheetNavigator
          initialRouteName="DashboardSortFilter"
          onClosePress={handleCloseVisibleSortFilter}
          meta={{
            setSelectedSort: (value) => handleChangeSortValue(value),
            selectedSort: selectedSort,
          }}
        />
      )}
    </ScreenTemplate>
  );
};

export default Dashboard;
