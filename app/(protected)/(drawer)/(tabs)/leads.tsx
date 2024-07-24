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
import React, { RefObject, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
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

const settings = () => {
  const { t } = useTranslation("modalText");
  const { t: td } = useTranslation("dashBoard");
  const { t: ts } = useTranslation("addData");
  const { colors } = useAppTheme();
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
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [openSwipeAbleRef, setOpenSwipeAbleRef] =
    useState<RefObject<Swipeable> | null>(null);
  const [modal, setModal] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const handleDelete = async (slug: number) => {
    setShowModal(true);
    setDeleteCardId(slug);
  };

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
  return (
    <ScreenTemplate
      addButtonText={ts("lead")}
      onAddButtonPress={() => {
        dispatch(setLeadsInformation());
        router.navigate(`/(protected)/add-lead/add`);
      }}>
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
    </ScreenTemplate>
  );
};

export default settings;
