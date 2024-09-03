import { useAppTheme } from '@constants/theme';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import LeadDetailCard from '@organisms/LeadDetailCard/LeadDetailCard';
import { ModalType } from '@organisms/LeadDetailCard/LeadDetailCard.props';
import { deleteLeadAction, getLeadListAction } from '@redux/actions/lead';
import { setLeadsFilters, setLeadsInformation } from '@redux/slices/leads';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import { LeadListState } from '@type/api/lead';
import { initialModalType } from '@utils/constant';
import { router } from 'expo-router';
import moment from 'moment';
import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Keyboard, Pressable, View } from 'react-native';
import { RefreshControl, Swipeable } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';
import {
  FlatListCon,
  LoaderView,
  NoDataFoundText,
  NoLeadsFoundContainer,
} from './tabs.style';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import Loader from '@atoms/Loader/Loader';
import ActionModal from '@molecules/ActionModal/ActionModal';
import { Actions } from '@molecules/ActionModal/ActionModal.props';
import TrashIcon from '@atoms/Illustrations/Trash';
import TextInput from '@atoms/TextInput/TextInput';
import isEmpty from 'lodash/isEmpty';
import { useDebounce } from '@utils/useDebounce';
import {
  ActionBtnView,
  FilterContainer,
  FilterCountText,
  FilterCountView,
  FilterIconView,
  SearchInputContainer,
  SeparatorComponent,
} from './drawer.style';
import FilterIcon from '@atoms/Illustrations/Filter';
import { DropdownBottomSheetSnapPoints } from '@constants/common';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import FormTemplate from '@templates/FormTemplate/FormTemplate';
import LeadsFilterForm from '@organisms/LeadsFilterForm/LeadsFilterForm';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ButtonSize = 40;

const Leads = () => {
  const { t } = useTranslation('modalText');
  const { top } = useSafeAreaInsets();
  const { t: td } = useTranslation('dashBoard');
  const { colors } = useAppTheme();
  const bottomSheetRef = useRef<any>(null);
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList?.leads,
  );
  const leadsFilter = useSelector(
    (state: RootState) => state.leads.leadsFilter,
  );
  const leadListData = useSelector((state: RootState) => state.leads.leadList);
  const toast = useToast();
  const general = useSelector((state: RootState) => state.general);
  const [showModal, setShowModal] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState<number | null>();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [modalType, setModalType] = useState<ModalType>(initialModalType);
  const [leadId, setLeadId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadSearch, setLeadSearch] = useState('');
  const [filterSheet, setFilterSheet] = useState(false);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [openSwipeAbleRef, setOpenSwipeAbleRef] =
    useState<RefObject<Swipeable> | null>(null);
  const [modal, setModal] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const handleDelete = async (slug: number) => {
    setShowModal(true);
    setDeleteCardId(slug);
  };
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
      setDeleteCardId(null);
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
    setModal(false);
    openSwipeAbleRef?.current?.close();
  };

  const handleEdit = (slug: string | number) => {
    dispatch(setLeadsInformation());
    router.navigate(`/(protected)/add-lead/${slug}`);
  };

  const closeSwipeAble = () => {
    if (openSwipeAbleRef && openSwipeAbleRef.current) {
      openSwipeAbleRef.current.close();
    }
  };

  const setSwipeAbleRef = (ref: RefObject<Swipeable>) => {
    setOpenSwipeAbleRef(ref);
  };
  const getLeadListData = async () => {
    try {
      setLeadsLoading(true);
      await dispatch(getLeadListAction({})).unwrap();
    } catch (error) {
      console.log(error);
    }
    setLeadsLoading(false);
  };
  useEffect(() => {
    openSwipeAbleRef?.current?.close();
  }, []);
  const RenderComponent = ({
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
        onDelete={() => handleDelete(item?.id)}
        onEdit={() => handleEdit(item?.id)}
        whatsAppNumber={item.phone}
        phoneNumber={item.phone}
        channelList={general.leadChannelList}
        leadList={general.leadStatusList}
        StageList={general.leadConversionList}
        LeadDetails={item.productService.map((item) => item.name)}
        title={item.name}
        email={item.email}
        dateTime={moment(item?.updatedAt || item?.createdAt).format(
          'DD MMM YYYY, hh:mm A',
        )}
        closeSwipeAble={closeSwipeAble}
        setSwipeAbleRef={setSwipeAbleRef}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        cardIndex={index}
        setModal={setModal}
        modal={modal}
        setModalType={setModalType}
        modalType={modalType}
        leadStatusId={item?.leadStatusId}
        leadChannelId={item?.leadChannelId}
        leadConversionId={item?.leadConversionId}
        leadCardId={item?.id}
        setCurrentId={setCurrentId}
        currentId={currentId}
        handleGetLeadsData={getLeadListData}
        setLeadId={setLeadId}
        leadId={leadId}
        assignedTo={item.assignTo}
      />
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

  useEffect(() => {
    const states = [
      leadsFilter?.startDate,
      leadsFilter?.endDate,
      leadsFilter?.selectedChannel,
      leadsFilter?.selectedStatus,
      leadsFilter?.selectedStage,
      leadsFilter?.orderBy,
      leadsFilter?.sortBy,
    ];
    const count = states.filter(
      (state) => state !== null && state !== undefined && state !== '',
    ).length;
    setFilterCount(count);
  }, [leadsFilter]);

  const handleApplyFilter = async (values: any) => {
    const states = [
      values?.startDate || leadsFilter?.startDate,
      values?.endDate || leadsFilter?.endDate,
      values?.selectedChannel || leadsFilter?.selectedChannel,
      values?.selectedStatus || leadsFilter?.selectedStatus,
      values?.selectedStage || leadsFilter?.selectedStage,
      values?.orderBy || leadsFilter?.orderBy,
      values?.sortBy || leadsFilter?.sortBy,
    ];

    const count = states.filter(
      (state) => state !== null && state !== undefined && state !== '',
    ).length;
    setFilterCount(count);
    dispatch(setLeadsFilters(values));
    try {
      setFilterLoading(true);
      await dispatch(
        getLeadListAction({
          end_date:
            (values?.endDate && moment(values?.endDate).format('YYYY-MM-DD')) ||
            undefined,
          start_date:
            (values?.startDate &&
              moment(values?.startDate).format('YYYY-MM-DD')) ||
            undefined,
          search: debouncedLeadSearch,
          lead_channel_id: values?.selectedChannel,
          lead_conversion_id: values?.selectedStage,
          lead_status_id: values?.selectedStatus,
          order_by: values?.orderBy,
          sort_order: values?.sortBy,
        }),
      ).unwrap();
    } catch (error) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setFilterSheet(false);
    setFilterLoading(false);
    bottomSheetRef.current?.close();
  };
  const handleOpenBottomSheetOpen = () => {
    setFilterSheet(true);
    bottomSheetRef.current?.present();
    Keyboard?.dismiss();
  };
  const handleBottomSheetClose = () => {
    bottomSheetRef.current?.close();
  };
  const onAddButtonPress = () => {
    dispatch(setLeadsInformation());
    router.navigate(`./addLead`);
  };

  const renderHeader = () => {
    return (
      <FilterContainer>
        <SearchInputContainer>
          <TextInput
            mode="outlined"
            value={leadSearch}
            onChangeText={(text) => setLeadSearch(text)}
            placeholder={t('searchLeads')}
            style={[
              {
                borderRadius: 25,
                overflow: 'hidden',
                borderColor: colors.primaryColor,
                paddingLeft: 10,
                paddingRight: 40,
              },
            ]}
            outlineColor="transparent"
            outlineStyle={{ borderWidth: 0 }}
          />
          <FilterIconView onPress={handleOpenBottomSheetOpen}>
            {filterCount > 0 && (
              <FilterCountView>
                <FilterCountText>{filterCount}</FilterCountText>
              </FilterCountView>
            )}
            <FilterIcon color={colors.primaryColor} />
          </FilterIconView>
        </SearchInputContainer>
      </FilterContainer>
    );
  };
  if (leadsLoading) {
    return (
      <ScreenTemplate>
        {renderHeader()}
        <LoaderView>
          <ActivityIndicator color={colors.primaryColor} />
        </LoaderView>
      </ScreenTemplate>
    );
  }
  return (
    <ScreenTemplate>
      {renderHeader()}
      {leadsData?.length > 0 ? (
        <FlatList
          contentContainerStyle={{ paddingBottom: ButtonSize + 20 }}
          data={leadsData}
          keyExtractor={(item: any, index: number) => `${item.id}-${index}`}
          renderItem={RenderComponent}
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
          ItemSeparatorComponent={() => <SeparatorComponent />}
        />
      ) : (
        <NoLeadsFoundContainer>
          <NoDataFoundText>{td('noLeadsFound')}</NoDataFoundText>
        </NoLeadsFoundContainer>
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

      <BottomSheetModal
        backgroundStyle={{
          backgroundColor: colors.darkBackground,
        }}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        index={1}
        topInset={top}
        snapPoints={DropdownBottomSheetSnapPoints}
        onChange={(index) => {
          if (index <= 0) {
            bottomSheetRef.current?.close();
            setFilterSheet?.(false);
          }
        }}>
        <FormTemplate
          Component={LeadsFilterForm}
          onSubmit={(values) => handleApplyFilter(values)}
          handleDropDownClose={handleOpenBottomSheetOpen}
          loading={filterLoading}
          setFilterCount={setFilterCount}
          bottomSheetClose={handleBottomSheetClose}
        />
      </BottomSheetModal>

      {showModal && (
        <ActionModal
          isModal
          onBackdropPress={() => {
            setShowModal(false);
            setDeleteCardId(null);
            closeSwipeAble();
          }}
          heading={t('discardMedia')}
          description={t('disCardDescription')}
          label={t('yesDiscard')}
          actionType={Actions.delete}
          actiontext={t('cancel')}
          onCancelPress={() => {
            setShowModal(false);
            setDeleteCardId(null);
            closeSwipeAble();
          }}
          onActionPress={() => onDeleteActionPress(deleteCardId || 0)}
          icon={<TrashIcon color={colors?.deleteColor} />}
          loading={loading}
        />
      )}
    </ScreenTemplate>
  );
};

export default Leads;
