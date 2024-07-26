import { Spacer } from "@atoms/common/common.styles";
import Loader from "@atoms/Loader/Loader";
import { AddLeadTabBarData } from "@constants/dummyData";
import { useAppTheme } from "@constants/theme";
import TabBar from "@molecules/TabBar/TabBar";
import { ToastTypeProps } from "@molecules/Toast/Toast.props";
import BasicInformationForm from "@organisms/BasicInformatioForm/BasicInformationForm";
import { fileSystemProps } from "@organisms/BasicInformatioForm/BasicInformationForm.props";
import CompanyInformationForm from "@organisms/CompanyInformationForm/CompanyInformationForm";
import LeadDetailsForm from "@organisms/LeadDetailsForm/LeadDetailsForm";
import {
  getLeadDetailsAction,
  getLeadListAction,
  saveLeadAction,
  updateLeadAction,
} from "@redux/actions/lead";
import { addLeadInformation, setLeadsInformation } from "@redux/slices/leads";
import { RootState, useAppDispatch, useSelector } from "@redux/store";
import FormTemplate from "@templates/FormTemplate/FormTemplate";
import ScreenTemplate from "@templates/ScreenTemplate/ScreenTemplate";
import { AddLeadNavigationType, AddLeadTabBar } from "@type/api/api";
import {
  BasicInfoFormValuesType,
  CompanyInformationFromValueTypes,
  LeadInformationFromValuesType,
} from "@type/api/auth";
import { LeadListState } from "@type/api/lead";
import { router, useNavigation } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { AddLeadContainer } from "../(drawer)/tabs.style";
import { useTranslation } from "react-i18next";
import {
  dashboardLeadListAction,
  dashboardLeadStageCountAction,
} from "@redux/actions/dashboard";

const AddLead = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("screenTitle");
  const navigation = useNavigation();
  const [selectedTabNav, setSelectedTabNav] = useState(
    AddLeadTabBarData?.[0].title || ""
  );
  const [selectedCountryCodeValue, setSelectedCountryCodeValue] =
    useState<string>("");
  const { colors } = useAppTheme();
  const [sourceValue, setSourceValue] = useState<number>();
  const addLeadData = useSelector((state: RootState) => state.leads.addLead);
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail
  );
  const countryList = useSelector(
    (state: RootState) => state.general.countryList
  );
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList?.leads
  );
  const toast = useToast();
  const [documentArray, setDocumentArray] = useState<fileSystemProps[]>([]);
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [selectedLead, setSelectedLead] = useState(0);
  const [selectedStage, setSelectedStage] = useState(0);
  const [selectedService, setSelectedService] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [leadsDetailLoading, setDetailLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<LeadListState>(
    leadsData?.[0]
  );
  const [assignTo, setAssignTo] = useState();

  useEffect(() => {
    setSelectedData(leadsDetail);
  }, [leadsDetail]);
  useEffect(() => {
    navigation.setOptions({ title: t("addLead") });
  }, [navigation]);

  const handleSaveBasicInformation = async (
    values: BasicInfoFormValuesType
  ) => {
    dispatch(
      addLeadInformation({
        ...addLeadData,
        fullName: values.firstName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        countryCode: selectedCountryCodeValue,
      })
    );
    setSelectedTabNav(AddLeadTabBarData?.[1].title);
  };
  const handleSaveCompanyInformation = async (
    values: CompanyInformationFromValueTypes
  ) => {
    dispatch(
      addLeadInformation({
        ...addLeadData,
        companyName: values.companyName,
        companySize: values.companySize,
        webSite: values.webSite,
      })
    );
    setSelectedTabNav(AddLeadTabBarData?.[2].title);
  };

  const handleSaveLeadDetailsInformation = async (
    values: LeadInformationFromValuesType
  ) => {
    dispatch(
      addLeadInformation({
        ...addLeadData,
        comments: values.comments,
        budget: values.budget,
        timeFrame: values.timeFrame,
        selectedChannel,
        selectedLead,
        selectedStage,
        selectedServices: selectedService,
        dealAmount: values.dealAmount,
        winCloseReason: values.winCloseReason,
        dealCloseDate: values?.dealCloseDate
          ? moment(values.dealCloseDate).format("YYYY-MM-DD")
          : "",
        documents: documentArray,
      })
    );
    try {
      setLoading(true);
      let formData = new FormData();
      if (addLeadData?.email) {
        formData.append("email", addLeadData?.email);
      }
      formData.append("lead_channel_id", selectedChannel);
      formData.append("lead_conversion_id", selectedStage);
      formData.append("lead_status_id", selectedLead);
      selectedService.forEach((service, index) => {
        formData.append(`product_services[${index}]`, service);
      });
      formData.append("name", `${addLeadData.fullName || ""}`);
      formData.append("company_name", addLeadData?.companyName || "");
      if (values?.budget) {
        formData.append("budget", values?.budget);
      }
      if (addLeadData?.companySize) {
        formData.append("company_size", addLeadData?.companySize);
      }
      formData.append("company_website", addLeadData?.webSite || "");
      formData.append("time_line", values?.timeFrame || "");
      formData.append("description", values?.comments || "");
      if (values?.dealAmount) {
        formData.append("deal_amount", values?.dealAmount);
      }
      formData.append(
        "deal_close_date",
        values?.dealCloseDate
          ? moment(values.dealCloseDate).format("YYYY-MM-DD")
          : ""
      );
      formData.append("win_close_reason", values?.winCloseReason || "");
      const countryCodeAlpha = countryList?.filter(
        (item) => item?.id === addLeadData?.countryCode
      )?.[0]?.countryCodeAlpha;
      if (!addLeadData?.email) {
        formData.append("country_code_alpha", countryCodeAlpha);
        formData.append("phone", addLeadData?.phoneNumber);
      } else if (countryCodeAlpha && addLeadData?.phoneNumber) {
        formData.append("country_code_alpha", countryCodeAlpha);
        formData.append("phone", addLeadData?.phoneNumber);
      }

      if (documentArray?.length > 0) {
        documentArray.forEach((document, index) => {
          formData.append(`documents[${index}]`, {
            uri: document.uri,
            name: document.name,
            type: document.mimeType,
          });
        });
      }
      const response = await dispatch(saveLeadAction(formData)).unwrap();
      await dispatch(getLeadListAction({}));
      await dispatch(setLeadsInformation());
      toast.show(response.message, {
        type: "customToast",
        data: {
          type: ToastTypeProps.Success,
        },
      });
      router.navigate("/(protected)/(drawer)/(tabs)/leads");
      setDocumentArray([]);
      setSelectedChannel(0);
      setSelectedLead(0);
      setSelectedStage(0);
      setSelectedService([]);
    } catch (error: string | any) {
      toast.show(error, {
        type: "customToast",
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setLoading(false);
  };
  const renderForm = () => {
    switch (selectedTabNav) {
      case AddLeadTabBar.BASICINFO:
        return (
          <FormTemplate
            Component={BasicInformationForm}
            loading={loading}
            onSubmit={(values: BasicInfoFormValuesType) => {
              handleSaveBasicInformation(values);
            }}
            isSave
            setSelectedCountryCodeValue={setSelectedCountryCodeValue}
            selectedCountryCodeValue={selectedCountryCodeValue}
            documentArray={documentArray}
            setDocumentArray={setDocumentArray}
          />
        );
      case AddLeadTabBar.COMPANYINFO:
        return (
          <FormTemplate
            Component={CompanyInformationForm}
            loading={loading}
            onSubmit={(values: CompanyInformationFromValueTypes) => {
              handleSaveCompanyInformation(values);
            }}
            onBackClick={() => {
              setSelectedTabNav(AddLeadTabBarData?.[0].title);
            }}
            isSave
          />
        );

      case AddLeadTabBar.LEADDETAILS:
        return (
          <FormTemplate
            Component={LeadDetailsForm}
            loading={loading}
            onSubmit={(values: LeadInformationFromValuesType) =>
              handleSaveLeadDetailsInformation(values)
            }
            onBackClick={() => {
              setSelectedTabNav(AddLeadTabBarData?.[1].title);
            }}
            setSourceValue={setSourceValue}
            sourceValue={sourceValue}
            isSave
            setSelectedStage={setSelectedStage}
            setSelectedLead={setSelectedLead}
            setSelectedChannel={setSelectedChannel}
            selectedChannel={selectedChannel}
            selectedLead={selectedLead}
            selectedStage={selectedStage}
            setSelectedService={setSelectedService}
            selectedService={selectedService}
            setAssignTo={setAssignTo}
            assignTo={assignTo}
          />
        );
      default:
        return (
          <FormTemplate
            Component={BasicInformationForm}
            loading={loading}
            onSubmit={(values: BasicInfoFormValuesType) => {
              handleSaveBasicInformation(values);
            }}
            isSave
            setSelectedCountryCodeValue={setSelectedCountryCodeValue}
            selectedCountryCodeValue={selectedCountryCodeValue}
          />
        );
    }
  };
  return (
    <ScreenTemplate>
      <AddLeadContainer>
        <TabBar
          selectedActiveTab={selectedTabNav}
          setSelectedTabNav={setSelectedTabNav}
          tab={AddLeadTabBarData?.map(({ title }) => title)}
          selectedTabColor={colors.selectedTabColor}
          color={colors.primaryColor}
          radius={20}
          selectedTab={(val: any) => {
            setSelectedTabNav(val);
          }}
        />
        <Spacer size={32} />
        {leadsDetailLoading ? <Loader /> : renderForm()}
      </AddLeadContainer>
    </ScreenTemplate>
  );
};

export default AddLead;
