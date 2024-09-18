import { useAppTheme } from '@constants/theme';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import LeadDetailCard from '@organisms/LeadDetailCard/LeadDetailCard';
import { deleteLeadAction, getLeadListAction } from '@redux/actions/lead';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import { LeadListState } from '@type/api/lead';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';
import {
  CountsText,
  LeadsHeadingView,
  LoaderContainer,
  LeadsFlatList,
  HeadingText,
} from './tabs.style';
import Loader from '@atoms/Loader/Loader';
import ActionModal from '@molecules/ActionModal/ActionModal';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import TrashIcon from '@atoms/Illustrations/Trash';
import FilterIcon from '@atoms/Illustrations/Filter';
import SearchFilter from '@molecules/Search/Search';
import BottomSheetNavigator from '@organisms/bottom-sheet-Navigator/bottomSheetNavigator';
import { Spacer } from '@atoms/common/common.styles';
import QuickFilter from '@molecules/QuickFilter/QuickFilter';
import NoDataAvailable from '@molecules/NoDataAvailable/NoDataAvailable';
import { ScreenOptionType } from '@organisms/bottom-sheet-Navigator-Screen/screen.props';
import { LoadingStatus } from '../../(public)/login/LoginScreen.props';
import { DropdownDataType } from '@organisms/FieldDropDown/FieldDropDown.props';

const Leads = () => {
  const { t } = useTranslation('modalText');
  const { t: td } = useTranslation('dashBoard');
  const { t: tb } = useTranslation('bottomSheetNavigator');
  const { colors } = useAppTheme();
  const leadsData = useSelector((state: RootState) => state.leads.leadList);
  const leadListData = useSelector((state: RootState) => state.leads.leadList);
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [deleteLeadId, setDeleteLeadId] = useState<number | null>();
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(
    LoadingStatus.NONE,
  );
  const [leadSearch, setLeadSearch] = useState('');
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [visibleLeadsFilterSheet, setVisibleLeadsFilterSheet] = useState(false);
  const [visibleLeadsSortFilterSheet, setVisibleLeadsSortFilterSheet] =
    useState(false);

  const onDeleteActionPress = async (slug: number) => {
    setLoadingStatus(LoadingStatus.SCREEN);
    try {
      const response = await dispatch(
        deleteLeadAction({ lead_id: slug }),
      ).unwrap();
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });
      setShowModal(false);
      setDeleteLeadId(null);
    } catch (error: any) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setShowModal(false);
    setLoadingStatus(LoadingStatus.NONE);
  };

  const renderLeads = ({
    item,
    index,
  }: {
    item: LeadListState;
    index: number;
  }) => (
    <Pressable
      key={`${item.id}-${index}`}
      onPress={() => {
        console.log('pressCard', item.id);
      }}>
      <LeadDetailCard
        key={`${item.id}-${index}`}
        phoneNumber={item.phone}
        title={item.name}
        email={item.email}
        createdAt={item?.createdAt}
        leadId={item.id}
        optionType={ScreenOptionType.LEAD}
      />
      <Spacer size={16} />
    </Pressable>
  );
  const handleGetMoreData = async () => {
    if (
      leadListData &&
      leadListData?.lastPage > 1 &&
      leadListData?.currentPage !== leadListData?.lastPage
    ) {
      try {
        setLoadingStatus(LoadingStatus.MORE);
        await dispatch(
          getLeadListAction({
            page: leadListData?.currentPage + 1,
          }),
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
      setLoadingStatus(LoadingStatus.NONE);
    }
  };
  const onRefreshLeadList = async () => {
    try {
      setRefreshing(true);
      await dispatch(getLeadListAction({}));
    } catch (error) {
      console.log(error);
    }
    setRefreshing(false);
  };

  const handleSearchLead = async () => {
    try {
      setLoadingStatus(LoadingStatus.SCREEN);
      // await dispatch(getLeadListAction({ search: leadSearch })).unwrap();
    } catch (error) {
      console.log(error);
    }
    setLoadingStatus(LoadingStatus.NONE);
  };

  const renderHeader = () => {
    return (
      <SearchFilter
        search={leadSearch}
        setSearch={setLeadSearch}
        handleSearch={handleSearchLead}
        rightIcon={<FilterIcon />}
        onRightIconPress={handleVisibleLeadsFilter}
        dropdownDataType={DropdownDataType.LEADS}
      />
    );
  };
  if (loadingStatus === LoadingStatus.SCREEN) {
    return (
      <ScreenTemplate moreVisible>
        {renderHeader()}
        <LoaderContainer>
          <Loader color={colors.blueChaos} />
        </LoaderContainer>
      </ScreenTemplate>
    );
  }
  const handleVisibleLeadsFilter = () => {
    setVisibleLeadsFilterSheet(true);
  };
  const handleCloseVisibleFilter = () => {
    setVisibleLeadsFilterSheet(false);
  };
  const handleVisibleLeadsSortFilter = () => {
    setVisibleLeadsSortFilterSheet(true);
  };
  const handleCloseVisibleSortFilter = () => {
    setVisibleLeadsSortFilterSheet(false);
  };

  return (
    <ScreenTemplate moreVisible>
      <HeadingText>{t('leads')}</HeadingText>
      {renderHeader()}
      <LeadsHeadingView>
        <CountsText>
          {t('itemWithCount', { count: leadsData?.total })}
        </CountsText>
        <QuickFilter
          filterTitle={tb('select')}
          filterType={tb('sortBy')}
          onFilterPress={handleVisibleLeadsSortFilter}
        />
      </LeadsHeadingView>
      <Spacer size={16} />
      {leadsData.leads.length > 0 ? (
        <LeadsFlatList
          data={leadsData?.leads}
          keyExtractor={(item: any, index: number) => `${item.id}-${index}`}
          renderItem={renderLeads}
          showsVerticalScrollIndicator={false}
          onEndReached={handleGetMoreData}
          ListFooterComponent={
            loadingStatus === LoadingStatus.MORE ? <Loader size={24} /> : null
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefreshLeadList}
              colors={[colors.primaryColor]}
            />
          }
        />
      ) : (
        <NoDataAvailable
          text={td('noLeadsTitle')}
          description={td('noLeadsDesc')}
        />
      )}

      {showModal && (
        <ActionModal
          isModal
          onBackdropPress={() => {
            setShowModal(false);
            setDeleteLeadId(null);
          }}
          heading={t('discardMedia')}
          description={t('disCardDescription')}
          label={t('yesDiscard')}
          actionType={Actions.delete}
          actiontext={t('cancel')}
          onCancelPress={() => {
            setShowModal(false);
            setDeleteLeadId(null);
          }}
          onActionPress={() => onDeleteActionPress(deleteLeadId || 0)}
          icon={<TrashIcon color={colors?.deleteColor} />}
          loading={loadingStatus === LoadingStatus.SCREEN}
        />
      )}
      {visibleLeadsFilterSheet && (
        <BottomSheetNavigator
          initialRouteName="LeadsFilter"
          onClosePress={handleCloseVisibleFilter}
        />
      )}
      {visibleLeadsSortFilterSheet && (
        <BottomSheetNavigator
          initialRouteName="LeadsSortFilter"
          onClosePress={handleCloseVisibleSortFilter}
        />
      )}
    </ScreenTemplate>
  );
};

export default Leads;
