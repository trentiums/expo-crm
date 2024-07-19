import { PaddingSpace } from "@atoms/common/common.styles";
import ScreenTemplate from "@templates/ScreenTemplate/ScreenTemplate";
import React, { RefObject, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { FlatListCon } from "./tabs.style";
import { LeadListState } from "@type/api/lead";
import LeadDetailCard from "@organisms/LeadDetailCard/LeadDetailCard";
import { useAppTheme } from "@constants/theme";
import { RootState, useAppDispatch, useSelector } from "@redux/store";
import { useToast } from "react-native-toast-notifications";
import { ModalType } from "@organisms/LeadDetailCard/LeadDetailCard.props";
import { initialModalType } from "@utils/constant";
import { Swipeable } from "react-native-gesture-handler";

const settings = () => {
  const { t: ts } = useTranslation("addData");
  // const { t } = useTranslation("modalText");
  // const { t: td } = useTranslation("dashBoard");
  // const { colors } = useAppTheme();
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList?.leads
  );
  // const leadListData = useSelector((state: RootState) => state.leads.leadList);
  // const toast = useToast();
  // const general = useSelector((state: RootState) => state.general);
  // const [showModal, setShowModal] = useState(false);
  // const [deleteCardId, setDeleteCardId] = useState<number | null>();
  // const [selectedCard, setSelectedCard] = useState<number | null>(null);
  // const [modalType, setModalType] = useState<ModalType>(initialModalType);
  // const [leadId, setLeadId] = useState(0);
  // const [loading, setLoading] = useState(false);
  // const [moreLoading, setMoreLoading] = useState(false);
  // const [leadsLoading, setLeadsLoading] = useState(false);
  // const dispatch = useAppDispatch();
  // const [refreshing, setRefreshing] = useState(false);
  // const [openSwipeAbleRef, setOpenSwipeAbleRef] =
  //   useState<RefObject<Swipeable> | null>(null);
  // const [modal, setModal] = useState(false);
  // const [currentId, setCurrentId] = useState<number>(0);
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
      {/* <LeadDetailCard
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
      /> */}
      <Text>Hellos</Text>
    </Pressable>
  );
  console.log(leadsData, "leadsData");
  const handleFetchLeadList = async () => {
    console.log("inside function");
    const response = await fetch("/leads").then((res) =>
      console.log(res, "xyzzxxz")
    );
  };
  useEffect(() => {
    handleFetchLeadList();
  }, []);
  return (
    <ScreenTemplate
      addButtonText={ts("lead")}
      onAddButtonPress={() => {
        // dispatch(setLeadsInformation());
        // navigate("AddLead");
      }}>
      {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, color: "white" }}>Leads</Text>
      </View> */}
      <PaddingSpace>
        <FlatListCon
          data={leadsData}
          keyExtractor={(item: any, index: number) => `${item.id}-${index}`}
          renderItem={RenderComponent}
          showsVerticalScrollIndicator={false}
        />
      </PaddingSpace>
    </ScreenTemplate>
  );
};

export default settings;
