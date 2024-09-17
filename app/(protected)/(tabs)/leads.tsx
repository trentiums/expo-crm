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
import { LeadsFlatList, LoaderView } from './tabs.style';
import { ActivityIndicator } from 'react-native-paper';
import Loader from '@atoms/Loader/Loader';
import ActionModal from '@molecules/ActionModal/ActionModal';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import TrashIcon from '@atoms/Illustrations/Trash';
import isEmpty from 'lodash/isEmpty';
import { useDebounce } from '@utils/useDebounce';
import FilterIcon from '@atoms/Illustrations/Filter';
import SearchFilter from '@molecules/Search/Search';
import { Spacer } from '@atoms/common/common.styles';
import NoDataAvailable from '@molecules/NoDataAvailable/NoDataAvailable';
import { ScreenOptionType } from '@organisms/bottom-sheet-Navigator-Screen/screen.props';

const Leads = () => {
  const { t } = useTranslation('modalText');
  const { t: td } = useTranslation('dashBoard');
  const { colors } = useAppTheme();
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList?.leads,
  );
  const leadListData = useSelector((state: RootState) => state.leads.leadList);
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [deleteLeadId, setDeleteLeadId] = useState<number | null>();
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadSearch, setLeadSearch] = useState('');
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const debouncedLeadSearch = useDebounce(leadSearch || undefined, 300);
  const onDeleteActionPress = async (slug: number) => {
    setLoading(true);
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
    setLoading(false);
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
        setMoreLoading(true);
        await dispatch(
          getLeadListAction({
            page: leadListData?.currentPage + 1,
          }),
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
      setMoreLoading(false);
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
  const searchFilter = useMemo(() => {
    if (isEmpty(leadSearch)) {
      return {};
    }
    const filtersValue = {};
    filtersValue['search'] = leadSearch;
    return filtersValue;
  }, [leadSearch, debouncedLeadSearch]);
  useEffect(() => {
    handleSearchLead();
  }, [debouncedLeadSearch]);

  const handleSearchLead = async () => {
    try {
      setLeadsLoading(true);
      await dispatch(getLeadListAction(searchFilter)).unwrap();
    } catch (error) {
      console.log(error);
    }
    setLeadsLoading(false);
  };

  const renderHeader = () => {
    return (
      <SearchFilter
        search={leadSearch}
        setSearch={setLeadSearch}
        handleSearch={handleSearchLead}
        rightIcon={<FilterIcon />}
        //TODO: here in next PR filter api done
        onRightIconPress={() => console.log('hello')}
      />
    );
  };
  if (leadsLoading) {
    return (
      <ScreenTemplate moreVisible>
        {renderHeader()}
        <LoaderView>
          <ActivityIndicator color={colors.blueChaos} />
        </LoaderView>
      </ScreenTemplate>
    );
  }
  return (
    <ScreenTemplate moreVisible>
      {renderHeader()}
      {leadsData?.length > 0 ? (
        <LeadsFlatList
          data={leadsData}
          keyExtractor={(item: { id: number }, index: number) =>
            `${item.id}-${index}`
          }
          renderItem={renderLeads}
          showsVerticalScrollIndicator={false}
          onEndReached={handleGetMoreData}
          ListFooterComponent={moreLoading ? <Loader size={24} /> : null}
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
          loading={loading}
        />
      )}
    </ScreenTemplate>
  );
};

export default Leads;
