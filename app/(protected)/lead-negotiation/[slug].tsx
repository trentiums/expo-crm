import { useAppTheme } from "@constants/theme";
import { ToastTypeProps } from "@molecules/Toast/Toast.props";
import { DealWinCloseFormValues } from "@organisms/DealCloseWinForm/DealCloseWinForm.props";
import LeadProposalNegotiationForm from "@organisms/LeadProposolNagotioationForm/LeadProposolNagotioationForm";
import { getLeadDetailsAction, updateLeadAction } from "@redux/actions/lead";
import { RootState, useAppDispatch, useSelector } from "@redux/store";
import FormTemplate from "@templates/FormTemplate/FormTemplate";
import ScreenTemplate from "@templates/ScreenTemplate/ScreenTemplate";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "react-native-toast-notifications";

const LeadStageNegotiationScreen = () => {
  const { colors } = useAppTheme();
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList.leads
  );
  const countryList = useSelector(
    (state: RootState) => state.general.countryList
  );
  const slug = useLocalSearchParams();
  const { t } = useTranslation("screenTitle");
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const leadConversionId = slug?.leadConversionId;
  const leadId = +slug?.leadId;
  const handleGetLeadsDetails = async () => {
    await dispatch(getLeadDetailsAction({ lead_id: leadId }));
  };
  useEffect(() => {
    handleGetLeadsDetails();
  }, []);
  const handleSaveLeadsStatusChange = async (
    values: any,
    currentLeadId: number
  ) => {
    const data = leadsData?.filter((item) => item?.id === currentLeadId)?.[0];
    const selectedDataServices = data.productService?.map((item) => item?.id);
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("lead_id", `${currentLeadId || leadId}`);
      if (data?.email) {
        formData.append("email", data?.email);
      }
      formData.append("lead_channel_id", `${data?.leadChannelId || ""}`);
      formData.append("lead_conversion_id", `${leadConversionId}`);
      formData.append("lead_status_id", `${data?.leadStatusId}`);
      formData.append("name", data?.name);
      selectedDataServices.forEach((service, index) => {
        formData.append(`product_services[${index}]`, service);
      });
      formData.append("company_name", data?.companyName || "");
      formData.append("budget", data?.budget || "");
      if (data?.companySize) {
        formData.append("company_size", data?.companySize);
      }
      if (data?.assignTo) {
        formData.append("assign_to_user_id", `${data?.assignTo}`);
      }
      formData.append("company_website", data?.webSite || "");
      formData.append("time_line", data?.timeLine || "");
      formData.append("description", values?.description || "");
      if (data?.dealAmount) {
        formData.append("deal_amount", data?.dealAmount);
      }
      if (data?.dealCloseDate) {
        formData.append("deal_close_date", data?.dealCloseDate);
      }
      formData.append("win_close_reason", data?.winCloseReason || "");
      const countryCodeAlpha = countryList?.filter(
        (item) => item?.id === data?.countryId
      )?.[0]?.countryCodeAlpha;
      if (countryCodeAlpha && data?.phone) {
        formData.append("country_code_alpha", countryCodeAlpha);
        formData.append("phone", `${data?.phone}`);
      }

      const response = await dispatch(updateLeadAction(formData)).unwrap();
      router.navigate("(protected)/(drawer)/(tabs)/leads");
      toast.show(response?.message, {
        type: "customToast",
        data: {
          type: ToastTypeProps.Success,
        },
      });
      await dispatch(getLeadDetailsAction({ lead_id: leadId }));
    } catch (error: any) {
      toast.show(error, {
        type: "customToast",
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    navigation.setOptions({
      title: t("leadStageChange"),
      headerStyle: {
        backgroundColor: colors.tabBar,
      },
      headerTintColor: colors.white,
    });
  }, [navigation]);
  return (
    <ScreenTemplate>
      <FormTemplate
        Component={LeadProposalNegotiationForm}
        loading={loading}
        onSubmit={(values: DealWinCloseFormValues) => {
          handleSaveLeadsStatusChange(values, leadId);
        }}
        onCancelPress={() =>
          router.navigate("(protected)/(drawer)/(tabs)/leads")
        }
        leadCardId={leadId}
      />
    </ScreenTemplate>
  );
};

export default LeadStageNegotiationScreen;
