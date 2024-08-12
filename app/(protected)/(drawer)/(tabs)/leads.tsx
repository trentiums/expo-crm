import { useAppTheme } from "@constants/theme";
import { ToastTypeProps } from "@molecules/Toast/Toast.props";
import LeadDetailCard from "@organisms/LeadDetailCard/LeadDetailCard";
import { ModalType } from "@organisms/LeadDetailCard/LeadDetailCard.props";
import { deleteLeadAction, getLeadListAction } from "@redux/actions/lead";
import { setLeadsInformation } from "@redux/slices/leads";
import { RootState, useAppDispatch, useSelector } from "@redux/store";
import ScreenTemplate from "@templates/ScreenTemplate/ScreenTemplate";
import { LeadListState } from "@type/api/lead";
import { initialModalType } from "@utils/constant";
import { router } from "expo-router";
import moment from "moment";
import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Pressable } from "react-native";
import { RefreshControl, Swipeable } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import {
  FlatListCon,
  LoaderView,
  NoDataFoundText,
  NoLeadsFoundContainer,
} from "../tabs.style";
import { ActivityIndicator } from "react-native-paper";
import { PaddingSpace, Spacer } from "@atoms/common/common.styles";
import Loader from "@atoms/Loader/Loader";
import ActionModal from "@molecules/ActionModal/ActionModal";
import { Actions } from "@molecules/ActionModal/ActionModal.props";
import Trash from "@atoms/Illustrations/Trash";
import TextInput from "@atoms/TextInput/TextInput";
import isEmpty from "lodash/isEmpty";
import { useDebounce } from "@utils/useDebounce";
import {
  FilterContainer,
  FilterCountText,
  FilterCountView,
  FilterIconView,
  SearchInputContainer,
} from "../drawer.style";
import Filter from "@atoms/Illustrations/Filter";
import { DropdownBottomSheetSnapPoints } from "@constants/common";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import FormTemplate from "@templates/FormTemplate/FormTemplate";
import LeadsFilterForm from "@organisms/LeadsFilterForm/LeadsFilterForm";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "@atoms/Text/Text";

const settings = () => {
  const { t } = useTranslation("modalText");
  const { top } = useSafeAreaInsets();
  const { t: td } = useTranslation("dashBoard");
  const { t: ts } = useTranslation("addData");
  const { colors } = useAppTheme();
  const bottomSheetRef = useRef<any>(null);
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList?.leads
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
  const [leadSearch, setLeadSearch] = useState("");
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [openSwipeAbleRef, setOpenSwipeAbleRef] =
    useState<RefObject<Swipeable> | null>(null);
  const [modal, setModal] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [filterSheet, setFilterSheet] = useState(false);
  const [channelId, setChannelId] = useState();
  const [statusId, setStatusId] = useState();
  const [conversionId, setConversionId] = useState();
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
        deleteLeadAction({ lead_id: slug })
      ).unwrap();
      toast.show(response?.message, {
        type: "customToast",
        data: {
          type: ToastTypeProps.Success,
        },
      });
      setShowModal(false);
      setDeleteCardId(null);
    } catch (error: any) {
      toast.show(error, {
        type: "customToast",
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
        console.log("pressCard", item.id);
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
        mailID={item.email}
        dateTime={moment(item?.updatedAt || item?.createdAt).format(
          "DD MMM YYYY, hh:mm A"
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
        assignTo={item.assignTo}
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
          })
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
    filtersValue["search"] = leadSearch;
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

  const handleApplyFilter = async (values: any) => {
    const states = [
      startDate,
      endDate,
      channelId,
      statusId,
      conversionId,
      orderBy,
      sortBy,
    ];
    const count = states.filter(
      (state) => state !== null && state !== undefined && state !== ""
    ).length;
    setFilterCount(count);
    try {
      setFilterLoading(true);
      await dispatch(
        getLeadListAction({
          end_date:
            (endDate && moment(endDate).format("YYYY-MM-DD")) || undefined,
          start_date:
            (startDate && moment(startDate).format("YYYY-MM-DD")) || undefined,
          search: debouncedLeadSearch,
          lead_channel_id: channelId,
          lead_conversion_id: conversionId,
          lead_status_id: statusId,
          order_by: orderBy,
          sort_order: sortBy,
        })
      ).unwrap();
    } catch (error) {
      toast.show(error, {
        type: "customToast",
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
  return (
    <ScreenTemplate
      addButtonText={ts("lead")}
      onAddButtonPress={() => {
        dispatch(setLeadsInformation());
        router.navigate(`/(protected)/add-lead/add`);
      }}>
      <Spacer size={16} />
      <FilterContainer>
        <SearchInputContainer>
          <TextInput
            mode="outlined"
            value={leadSearch}
            onChangeText={(text) => setLeadSearch(text)}
            placeholder={t("searchLeads")}
            style={[
              {
                borderRadius: 25,
                overflow: "hidden",
                borderColor: colors.primaryColor,
              },
            ]}
            outlineColor="transparent"
            outlineStyle={{ borderWidth: 0 }}
          />
        </SearchInputContainer>
        <FilterIconView onPress={handleOpenBottomSheetOpen}>
          {filterCount > 0 && (
            <FilterCountView>
              <FilterCountText>{filterCount}</FilterCountText>
            </FilterCountView>
          )}
          <Filter />
        </FilterIconView>
      </FilterContainer>
      {leadsLoading ? (
        <LoaderView>
          <ActivityIndicator color={colors.primaryColor} />
        </LoaderView>
      ) : (
        <PaddingSpace>
          {leadsData?.length > 0 ? (
            <FlatListCon
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
            />
          ) : (
            <NoLeadsFoundContainer>
              <NoDataFoundText>{td("noLeadsFound")}</NoDataFoundText>
            </NoLeadsFoundContainer>
          )}
          {showModal && (
            <ActionModal
              isModal
              onBackdropPress={() => {
                setShowModal(false);
                setDeleteCardId(null);
                closeSwipeAble();
              }}
              heading={t("discardMedia")}
              description={t("disCardDescription")}
              label={t("yesDiscard")}
              actionType={Actions.delete}
              actiontext={t("cancel")}
              onCancelPress={() => {
                setShowModal(false);
                setDeleteCardId(null);
                closeSwipeAble();
              }}
              onActionPress={() => onDeleteActionPress(deleteCardId || 0)}
              icon={<Trash color={colors?.deleteColor} />}
              loading={loading}
            />
          )}
        </PaddingSpace>
      )}
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
            setFilterSheet(false);
          }
        }}>
        <FormTemplate
          Component={LeadsFilterForm}
          onSubmit={(values) => handleApplyFilter(values)}
          selectedChannel={channelId}
          setSelectedChannel={setChannelId}
          selectedLead={statusId}
          setSelectedLead={setStatusId}
          selectedStage={conversionId}
          setSelectedStage={setConversionId}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleDropDownClose={handleOpenBottomSheetOpen}
          loading={filterLoading}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setFilterCount={setFilterCount}
        />
      </BottomSheetModal>
    </ScreenTemplate>
  );
};

export default settings;
