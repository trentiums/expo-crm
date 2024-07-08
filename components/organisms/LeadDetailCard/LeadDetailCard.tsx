import React, { useRef, useState } from "react";
import {
  LeadDetailCardContainer,
  ModalFormContainer,
  RenderRightView,
  SwipeText,
  TouchableOpacityContainer,
  ViewContainer,
} from "./LeadDetailCard.styles";
import { Spacer } from "@atoms/common/common.styles";
import LeadDetailsList from "@molecules/LeadDetailsList/LeadDetailsList";
import { Swipeable } from "react-native-gesture-handler";
import Trash from "@atoms/Illustrations/Trash";
import EditIcon from "@atoms/Illustrations/EditIcon";
import LeadSelect from "@molecules/LeadSelect/LeadSelect";
import {
  LeadDetailCardProps,
  LeadStageType,
  LeadStatusTypes,
  ModalType,
} from "./LeadDetailCard.props";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "@constants/theme";
import { View } from "react-native";
import { RootState, useAppDispatch, useSelector } from "@redux/store";
import Modal from "@atoms/Modal/Modal";
import LeadStatusChangeForm from "@organisms/LeadStatusChangeForm/LeadStatusChangeForm";
import { LeadStatusChangeFormValues } from "@organisms/LeadStatusChangeForm/LeadStatusChangeForm.props";
import DealCloseWinForm from "@organisms/DealCloseWinForm/DealCloseWinForm";
import { DealWinCloseFormValues } from "@organisms/DealCloseWinForm/DealCloseWinForm.props";
import LeadProposalNegotiationForm from "@organisms/LeadProposolNagotioationForm/LeadProposolNagotioationForm";
import { LeadProposalNegotiationValues } from "@organisms/LeadProposolNagotioationForm/LeadProposolNegotiationForm.props";
import { initialModalType } from "@utils/constant";
import LeadDetail from "@molecules/LeadDetail/LeadDetail";
import { updateLeadAction } from "@redux/actions/lead";
import { useToast } from "react-native-toast-notifications";
import { ToastTypeProps } from "@molecules/Toast/Toast.props";
import FormTemplate from "@templates/FormTemplate/FormTemplate";

const LeadDetailCard: React.FC<LeadDetailCardProps> = ({
  whatsAppNumber,
  phoneNumber,
  channelList,
  leadList,
  StageList,
  onDelete,
  onEdit,
  LeadDetails,
  title,
  mailID,
  dateTime,
  closeSwipeAble,
  setSwipeAbleRef,
  cardIndex,
  selectedCard,
  setSelectedCard,
  setModal,
  modal,
  modalType,
  setModalType,
  leadStatusId,
  leadChannelId,
  leadConversionId,
  leadCardId,
  setCurrentId,
  currentId,
  handleGetLeadsData,
  setLeadId,
  leadId,
}) => {
  const { t } = useTranslation("leadDetailCardDetails");
  const { colors } = useAppTheme();
  const swipeAbleRef = useRef(null);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList.leads
  );
  const countryList = useSelector(
    (state: RootState) => state.general.countryList
  );

  const [loading, setLoading] = useState(false);

  const renderRightActions = () => (
    <RenderRightView>
      <TouchableOpacityContainer
        backgroundColor={colors?.lightBlue}
        onPress={onEdit}>
        <ViewContainer>
          <EditIcon />
        </ViewContainer>
        <Spacer size={10} />
        <SwipeText>{t("edit")}</SwipeText>
      </TouchableOpacityContainer>
      <TouchableOpacityContainer
        backgroundColor={colors?.deleteColor}
        onPress={onDelete}>
        <ViewContainer>
          <Trash />
        </ViewContainer>
        <Spacer size={10} />
        <SwipeText>{t("delete")}</SwipeText>
      </TouchableOpacityContainer>
    </RenderRightView>
  );
  const handleChangeLead = (leadId: number, value: number) => {
    if (
      (value === LeadStatusTypes.CONTACTED ||
        value === LeadStatusTypes.QUALIFIED ||
        value === LeadStatusTypes.UNQUALIFIED) &&
      value !== leadStatusId
    ) {
      setLeadId(leadId);
      setCurrentId(value);
      setModal(true);
      setModalType(
        (prevState: ModalType): ModalType => ({
          ...prevState,
          leadChange: true,
        })
      );
    } else {
      const data = leadsData?.filter((item) => item?.id === leadId)?.[0];
      handleSaveLeadsStatusChange(
        data,
        leadCardId,
        data?.leadChannelId,
        value,
        data?.leadConversionId
      );
    }
  };

  const handleChangeChannelId = (leadId: number, value: number) => {
    const data = leadsData?.filter((item) => item?.id === leadId)?.[0];
    handleSaveLeadsStatusChange(
      data,
      leadCardId,
      value,
      data?.leadStatusId,
      data?.leadConversionId
    );
  };

  const handleChangeLeadStage = (leadId: number, value: number) => {
    if (
      (value === LeadStageType.CLOSELOST ||
        value === LeadStageType.CLOSEWON ||
        value == LeadStageType.NEGOTIATION) &&
      value !== leadConversionId
    ) {
      setCurrentId(value);
      setLeadId(leadId);
      setModal(true);
      if (value === LeadStageType.NEGOTIATION) {
        setModalType((prevState: ModalType) => ({
          ...prevState,
          negotiation: true,
        }));
      } else {
        setModalType((prevState: ModalType) => ({
          ...prevState,
          closeWinLost: true,
        }));
      }
    } else {
      const data = leadsData?.filter((item) => item?.id === leadCardId)?.[0];
      handleSaveLeadsStatusChange(
        data,
        leadCardId,
        data?.leadChannelId,
        data?.leadStatusId,
        value
      );
    }
  };

  const handleCloseModal = async () => {
    setModalType(initialModalType);
    setModal(false);
  };
  const handleSaveLeadsStatusChange = async (
    values: any,
    currentLeadId: number,
    leadChannelId?: number,
    leadStageId?: number,
    leadConversionId?: number
  ) => {
    const data = leadsData?.filter((item) => item?.id === currentLeadId)?.[0];
    const selectedDataServices = data.productService?.map((item) => item?.id);
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("lead_id", currentLeadId || leadId);
      if (data?.email) {
        formData.append("email", data?.email);
      }
      formData.append(
        "lead_channel_id",
        leadChannelId || data?.leadChannelId || ""
      );
      formData.append(
        "lead_conversion_id",
        modalType?.closeWinLost || modalType?.negotiation
          ? currentId
          : leadConversionId || data?.leadConversionId
      );
      formData.append(
        "lead_status_id",
        modalType?.leadChange ? currentId : leadStageId || data?.leadStatusId
      );
      formData.append("name", data?.name);
      selectedDataServices.forEach((service, index) => {
        formData.append(`product_services[${index}]`, service);
      });
      formData.append(
        "company_name",
        values?.companyName || data?.companyName || ""
      );
      formData.append("budget", values?.budget || data?.budget || "");
      if (data?.companySize) {
        formData.append("company_size", data?.companySize);
      }

      formData.append(
        "company_website",
        values?.webSite || data?.webSite || ""
      );
      formData.append("time_line", values?.timeFrame || data?.timeLine || "");
      formData.append(
        "description",
        values?.description || values?.comments || data?.description || ""
      );
      if (values?.dealAmount || data?.dealAmount) {
        formData.append("deal_amount", values?.dealAmount || data?.dealAmount);
      }
      if (data?.dealCloseDate) {
        formData.append("deal_close_date", data?.dealCloseDate);
      }
      formData.append(
        "win_close_reason",
        values?.reason || data?.winCloseReason || ""
      );
      const countryCodeAlpha = countryList?.filter(
        (item) => item?.id === data?.countryId
      )?.[0]?.countryCodeAlpha;
      if (countryCodeAlpha && data?.phone) {
        formData.append("country_code_alpha", countryCodeAlpha);
        formData.append("phone", values?.phoneNumber || data?.phone);
      }

      const response = await dispatch(updateLeadAction(formData)).unwrap();

      toast.show(response?.message, {
        type: "customToast",
        data: {
          type: ToastTypeProps.Success,
        },
      });
      await handleGetLeadsData();
    } catch (error: any) {
      toast.show(error, {
        type: "customToast",
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setLoading(false);
    setModalType(initialModalType);
    setModal(false);
  };
  return (
    <>
      <Swipeable
        ref={swipeAbleRef}
        renderRightActions={renderRightActions}
        onSwipeableWillOpen={() => {
          if (cardIndex !== selectedCard) {
            closeSwipeAble();
          }
          setSwipeAbleRef(swipeAbleRef);
          setSelectedCard(cardIndex);
        }}
        onSwipeableWillClose={() => {
          setSelectedCard(cardIndex);
        }}>
        <LeadDetailCardContainer isActive={false}>
          <LeadDetail
            phoneNumber={phoneNumber}
            whatsAppNumber={whatsAppNumber}
            mailID={mailID}
            title={title}
            dateTime={dateTime}
          />
          <Spacer size={16} />
          <View>
            <LeadDetailsList LeadDetails={LeadDetails} />
          </View>
          <LeadSelect
            channelList={channelList}
            leadList={leadList}
            StageList={StageList}
            selectedChannel={leadChannelId}
            setSelectedChannel={(leadId, value) =>
              handleChangeChannelId(leadId, value)
            }
            selectedLead={leadStatusId}
            setSelectedLead={(leadId, value) => handleChangeLead(leadId, value)}
            selectedStage={leadConversionId}
            setSelectedStage={(leadId, value) =>
              handleChangeLeadStage(leadId, value)
            }
            leadCardId={leadCardId}
          />
        </LeadDetailCardContainer>
      </Swipeable>
      <Spacer size={16} />
      <Modal isVisible={modal} onBackdropPress={handleCloseModal}>
        <ModalFormContainer>
          {modalType.leadChange && (
            <FormTemplate
              Component={LeadStatusChangeForm}
              loading={loading}
              onSubmit={(values: LeadStatusChangeFormValues) => {
                handleSaveLeadsStatusChange(values, leadId);
                setModal(false);
              }}
              leadCardId={leadId}
              onCancelPress={handleCloseModal}
            />
          )}
          {modalType.closeWinLost && (
            <FormTemplate
              Component={DealCloseWinForm}
              loading={loading}
              onSubmit={(values: DealWinCloseFormValues) => {
                handleSaveLeadsStatusChange(values, leadId);
                setModal(false);
              }}
              onCancelPress={handleCloseModal}
              isDealClose={currentId === LeadStageType.CLOSELOST}
              leadCardId={leadId}
            />
          )}
          {modalType.negotiation && (
            <FormTemplate
              Component={LeadProposalNegotiationForm}
              loading={loading}
              onSubmit={(values: LeadProposalNegotiationValues) => {
                handleSaveLeadsStatusChange(values, leadId);
                setModal(false);
              }}
              onCancelPress={handleCloseModal}
            />
          )}
        </ModalFormContainer>
      </Modal>
    </>
  );
};

export default LeadDetailCard;
