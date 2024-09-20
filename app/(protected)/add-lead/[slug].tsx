import { Spacer } from '@atoms/common/common.styles';
import Loader from '@atoms/Loader/Loader';
import { AddLeadTabBarData } from '@constants/dummyData';
import { useAppTheme } from '@constants/theme';
import TabBar from '@molecules/TabBar/TabBar';
import { ToastType, ToastTypeProps } from '@molecules/Toast/Toast.props';
import BasicInformationForm from '@organisms/BasicInformationForm/BasicInformationForm';
import { FileSystemProps } from '@organisms/BasicInformationForm/BasicInformationForm.props';
import CompanyInformationForm from '@organisms/CompanyInformationForm/CompanyInformationForm';
import LeadDetailsForm from '@organisms/LeadDetailsForm/LeadDetailsForm';
import { getLeadDetailsAction, updateLeadAction } from '@redux/actions/lead';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import FormTemplate from '@templates/FormTemplate/FormTemplate';
import ScreenTemplate from '@templates/ScreenTemplate/ScreenTemplate';
import { AddLeadNavigationType, AddLeadTabBar } from '@type/api/api';
import {
  BasicInfoFormValuesType,
  CompanyInformationFromValueTypes,
  LeadInformationFromValuesType,
} from '@type/api/auth';
import { LeadListState } from '@type/api/lead';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { AddLeadContainer } from '../tabs.style';
import { useTranslation } from 'react-i18next';
import View from '@atoms/View/View';
import Stepper from '@molecules/Stepper/Stepper';
import { stepData } from '@utils/constant';

const AddLead = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation('screenTitle');
  const params = useLocalSearchParams();
  const [id] = useState(params.slug);
  const [selectedTabNav, setSelectedTabNav] = useState(
    AddLeadTabBarData?.[0].title || '',
  );
  const [selectedCountryCodeValue, setSelectedCountryCodeValue] =
    useState<string>('');
  const { colors } = useAppTheme();
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const countryList = useSelector(
    (state: RootState) => state.general.countryList,
  );
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList?.leads,
  );
  const toast = useToast();
  const [documentArray, setDocumentArray] = useState<FileSystemProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [leadsDetailLoading, setDetailLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<LeadListState>(
    leadsData?.[0],
  );
  const getLeadDetails = async () => {
    if (id) {
      setDetailLoading(true);
      setDocumentArray([]);
      try {
        await dispatch(getLeadDetailsAction({ lead_id: +id })).unwrap();
      } catch (error) {
        console.log(error, 'error');
        toast.show(error, {
          type: ToastType.Custom,
          data: {
            type: ToastTypeProps.Error,
          },
        });
        router.navigate('/(protected)/(tabs)/leads');
      }
      setDetailLoading(false);
    }
  };
  useEffect(() => {
    getLeadDetails();
  }, [id]);

  useEffect(() => {
    setSelectedData(leadsDetail);
  }, [leadsDetail]);
  const commonUpdateLead = async (
    values: any,
    id: any,
    navigationType: string,
  ) => {
    const selectedDataServices = selectedData.productService?.map(
      (item) => item.id,
    );

    try {
      setLoading(true);
      let formData = new FormData();
      formData.append('lead_id', id);
      if (values?.email) {
        formData.append(
          'email',
          navigationType === AddLeadNavigationType.BASIC
            ? values?.email
            : selectedData?.email,
        );
      }
      formData.append(
        'lead_channel_id',
        `${values?.selectedChannel || selectedData.leadChannelId}`,
      );
      formData.append(
        'lead_conversion_id',
        `${values?.selectedStage || selectedData.leadConversionId}`,
      );
      formData.append(
        'lead_status_id',
        `${values?.selectedLead || selectedData.leadStatusId}`,
      );
      formData.append(
        'name',
        navigationType === AddLeadNavigationType.BASIC
          ? values?.firstName
          : selectedData.name,
      );
      values?.selectedServices?.length > 0
        ? values?.selectedServices?.forEach((service, index) => {
            formData.append(`product_services[${index}]`, service);
          })
        : selectedDataServices.forEach((service, index) => {
            formData.append(`product_services[${index}]`, service);
          });
      formData.append(
        'company_name',
        navigationType === AddLeadNavigationType.COMPANY
          ? values?.companyName || ''
          : selectedData.companyName || '',
      );
      if (values?.budget || selectedData?.budget) {
        formData.append(
          'budget',
          navigationType === AddLeadNavigationType.LEAD
            ? values?.budget || ''
            : selectedData?.budget || '',
        );
        formData.append(
          'budget_currency_id',
          navigationType === AddLeadNavigationType.LEAD
            ? values?.budgetCurrencyCode
            : selectedData?.budgetCurrencyCode,
        );
      }
      if (values?.companySize || selectedData.companySize) {
        formData.append(
          'company_size',
          navigationType === AddLeadNavigationType.COMPANY
            ? values?.companySize
            : selectedData.companySize,
        );
      }
      formData.append(
        'company_website',
        navigationType === AddLeadNavigationType.COMPANY
          ? values?.webSite || ''
          : selectedData.webSite || '',
      );
      if (
        values?.timeFrameType ||
        selectedData?.timeFrameType ||
        selectedData.timeLine ||
        values?.timeFrame
      ) {
        formData.append(
          'timeline_timeframe',
          navigationType === AddLeadNavigationType.LEAD
            ? values?.timeFrameType || undefined
            : selectedData?.timeFrameType || undefined,
        );
        formData.append(
          'time_line',
          navigationType === AddLeadNavigationType.LEAD
            ? values?.timeFrame || ''
            : selectedData.timeLine || '',
        );
      }
      formData.append(
        'description',
        navigationType === AddLeadNavigationType.LEAD
          ? values?.comments || ''
          : selectedData.description || '',
      );
      if (values?.dealAmount || selectedData.dealAmount) {
        formData.append(
          'deal_amount',
          navigationType === AddLeadNavigationType.LEAD
            ? values?.dealAmount || ''
            : selectedData.dealAmount || '',
        );
        formData.append(
          'deal_amount_currency_id',
          values?.dealAmountCurrencyCode ||
            selectedData?.dealAmountCurrencyCode,
        );
      }
      if (values?.assignTo || selectedData.assignTo) {
        formData.append(
          'assign_to_user_id',
          `${values?.assignTo || selectedData.assignTo}`,
        );
      }
      if (values?.dealCloseDate || selectedData?.dealCloseDate) {
        formData.append(
          'deal_close_date',
          navigationType === AddLeadNavigationType.LEAD
            ? moment(values.dealCloseDate).format('YYYY-MM-DD')
            : moment(selectedData?.dealCloseDate).format('YYYY-MM-DD'),
        );
      }
      formData.append(
        'win_close_reason',
        navigationType === AddLeadNavigationType.LEAD
          ? values?.winCloseReason || ''
          : selectedData.winCloseReason || '',
      );

      if (
        navigationType === AddLeadNavigationType.BASIC &&
        values.phoneNumber &&
        values?.countryCode
      ) {
        formData.append('phone', values?.phoneNumber);
        formData.append(
          'country_code_alpha',
          countryList?.filter((item) => item?.id === +values?.countryCode)?.[0]
            ?.countryCodeAlpha,
        );
      } else if (
        values?.countryCode &&
        navigationType !== AddLeadNavigationType.BASIC &&
        selectedData.phone
      ) {
        formData.append('phone', `${selectedData.phone}`);
        formData.append(
          'country_code_alpha',
          countryList?.filter(
            (item) => item?.id === +selectedData?.countryId,
          )?.[0]?.countryCodeAlpha,
        );
      }
      const newDocumentsArray = documentArray?.filter((item) => !item.id);
      if (newDocumentsArray?.length > 0) {
        newDocumentsArray.forEach((document, index) => {
          formData.append(`documents[${index}]`, {
            uri: document.uri,
            name: document.name,
            type: document.mimeType,
          });
        });
      }
      const response = await dispatch(updateLeadAction(formData)).unwrap();
      await dispatch(getLeadDetailsAction({ lead_id: id })).unwrap();
      toast.show(response?.message, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Success,
        },
      });
      if (id) {
        router.back();
      } else {
        if (navigationType === AddLeadTabBarData?.[0].title) {
          setSelectedTabNav(AddLeadTabBarData?.[1].title);
        } else if (navigationType === AddLeadTabBarData?.[1].title) {
          setSelectedTabNav(AddLeadTabBarData?.[2].title);
        } else {
          router.navigate('/(tabs)/leads');
        }
      }
    } catch (error: any) {
      toast.show(error, {
        type: ToastType.Custom,
        data: {
          type: ToastTypeProps.Error,
        },
      });
    }
    setLoading(false);
  };
  const handleSaveBasicInformation = async (
    values: BasicInfoFormValuesType,
  ) => {
    if (id) {
      await commonUpdateLead(values, id, AddLeadTabBarData?.[0].title);
    }
  };
  const handleSaveCompanyInformation = async (
    values: CompanyInformationFromValueTypes,
  ) => {
    if (id) {
      await commonUpdateLead(values, id, AddLeadTabBarData?.[1].title);
    }
  };
  const handleSaveLeadDetailsInformation = async (
    values: LeadInformationFromValuesType,
  ) => {
    if (id) {
      await commonUpdateLead(values, id, AddLeadTabBarData?.[2].title);
    }
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
            isSave
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
            documentArray={documentArray}
            setDocumentArray={setDocumentArray}
          />
        );
    }
  };
  return (
    <ScreenTemplate title={id ? t('editLead') : t('addLead')}>
      <AddLeadContainer>
        <Spacer size={16} />
        <View>
          <Stepper
            stepData={stepData}
            currentId={selectedTabNav.id}
            setSelectedTabNav={setSelectedTabNav}
          />
        </View>
        <Spacer size={32} />
        {leadsDetailLoading ? <Loader /> : renderForm()}
      </AddLeadContainer>
    </ScreenTemplate>
  );
};

export default AddLead;
