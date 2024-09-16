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
} from './tabs.style';
import { FlatList } from 'react-native-gesture-handler';
import { Spacer } from '@atoms/common/common.styles';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { useAppTheme } from '@constants/theme';
import { DashboardLeadsProps } from '@type/redux/slices/dashboard';
import {
  dashboardLeadListAction,
  dashboardLeadStageCountAction,
} from '@redux/actions/dashboard';
import { setLeadsInformation } from '@redux/slices/leads';
import DashBoardLeadCard from '@organisms/DashBoardLeadCard/DashBoardLeadCard';
import { Pressable } from 'react-native';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import { deleteLeadAction } from '@redux/actions/lead';
import React from 'react';
import { router } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import Button from '@atoms/Button/Button';
import LeadsProgressChart from '@organisms/LeadsProgressChart/LeadsProgressChart';
import CompanyDashboardCard from '@molecules/CompanyDashboardCard/CompanyDashboardCard';
import QuickFilter from '@molecules/QuickFilter/QuickFilter';
import NoDataAvailable from '@molecules/NoDataAvailable/NoDataAvailable';

const Dashboard = () => {
  const { colors } = useAppTheme();
  const { t } = useTranslation('dashBoard');
  const { t: tm } = useTranslation('modalText');
  const { t: tr } = useTranslation('drawer');
  const toast = useToast();
  const user = useSelector((state: RootState) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletedId, setDeletedId] = useState<number | undefined>();
  const dashboardLeadList = useSelector((state: RootState) => state.dashboard);
  const [leads, setLeads] = useState<DashboardLeadsProps[]>(
    dashboardLeadList.leadList,
  );
  const dispatch = useAppDispatch();
  const handelFetchLead = async () => {
    setLoading(true);
    await dispatch(dashboardLeadListAction({}));
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
  const companyLeadTextColor = [
    colors.green,
    colors.yellow,
    colors.red,
    colors.blue,
    colors.englishHolly,
  ];
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
    setLeads(dashboardLeadList.leadList);
  }, [dashboardLeadList]);

  const handleDelete = (id: number) => {
    setShowModal(true);
    setDeletedId(id);
  };

  const onDeleteActionPress = async () => {
    setDeleteLoading(true);
    try {
      const response = await dispatch(
        deleteLeadAction({ lead_id: deletedId }),
      ).unwrap();
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });
      await handelFetchLead();
    } catch (error: any) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setDeleteLoading(false);
    setShowModal(false);
  };

  const renderLeads = ({
    lead,
    index,
  }: {
    lead: DashboardLeadsProps;
    index: number;
  }) => (
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
  );

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
                    progress: 0,
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
                  filterTitle={t('leadsCount')}
                  filterType={t('sortBy')}
                />
              </DashboardFilterView>
              <Spacer size={16} />
              <CompanyDashboardCard
                leads={dashboardLeadList.leadStageCount?.map((item, index) => {
                  return {
                    title: item?.name,
                    value: item?.leadCount,
                    bgColor: chartColors[index],
                    color: companyLeadTextColor[index],
                  };
                })}
                name="Romes Smith"
                leadsCount={12}
              />
              {leads?.length > 0 ? (
                <FlatList
                  data={leads}
                  renderItem={({ item: lead, index }) =>
                    renderLeads({ lead, index })
                  }
                  keyExtractor={(lead, index) =>
                    `${lead.name.toString()} - ${index}`
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

              <Spacer size={100} />
            </DashboardScreenContainer>
          )}
        </>
      )}
    </ScreenTemplate>
  );
};

export default Dashboard;
