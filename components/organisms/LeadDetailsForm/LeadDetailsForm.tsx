import { Spacer } from '@atoms/common/common.styles';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import { Label } from '@organisms/BasicInformationForm/BasicInformationForm.styles';
import {
  composeValidators,
  numberAndFractionalNumberValidator,
} from '@utils/formValidators';
import React, { useEffect, useState } from 'react';
import { Field, useFormState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LeadDetailsFormProps } from './LeadDetailsForm.props';
import {
  DropdownView,
  FormsView,
  InputView,
  LabelDescriptionText,
  RowView,
  SelectedServiceData,
  ServiceLabel,
  ServiceText,
} from './LeadDetailsForm.styles';
import View from '@atoms/View/View';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import FieldDatePicker from '@molecules/FieldDatePicker/FieldDatePicker';
import moment from 'moment';
import { useRoute } from '@react-navigation/native';
import { LeadListTypeState } from '@type/api/lead';
import {
  ButtonSubmit,
  ContainerView,
  FormButtonText,
  SubContainerView,
} from '@organisms/CompanyInformationForm/CompanyInformationForm.styles';
import { addLeadInformation } from '@redux/slices/leads';
import { UserRole } from '@type/api/auth';
import { useAppTheme } from '@constants/theme';
import { LeadStageType } from '@organisms/LeadDetailCard/LeadDetailCard.props';
import { getProductServiceListAction } from '@redux/actions/productService';
import FieldDropDown from '@organisms/FieldDropDown/FieldDropdown';
import { Pressable } from 'react-native';
import { ShowMultipleDataList } from '@molecules/DropDown/DropDown.styles';
import CrossSmallIcon from '@atoms/Illustrations/CrossSmall';
import { DropdownDataType } from '@organisms/FieldDropDown/FieldDropDown.props';

const LeadDetailsForm: React.FC<LeadDetailsFormProps> = ({
  form,
  loading,
  isSave,
  onBackClick,
  assignTo,
}) => {
  const { t } = useTranslation('leadDetails');
  const { t: tb } = useTranslation('formButtonName');
  const { t: tl } = useTranslation('leadDetailList');
  const { t: td } = useTranslation('drawer');
  const route = useRoute();
  const { values, valid } = useFormState();
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const addLeadFormData = useSelector(
    (state: RootState) => state.leads.addLead,
  );
  const settings = useSelector((state: RootState) => state.general.settings);
  const general = useSelector((state: RootState) => state.general);
  const servicesData = useSelector(
    (state: RootState) => state.productService.productServiceList?.serviceList,
  );
  const currencyList = useSelector(
    (state: RootState) => state.general.currencyList,
  );
  const productServiceListData = useSelector(
    (state: RootState) => state.productService.productServiceList,
  );
  const leadsData = useSelector(
    (state: RootState) => state.leads.leadList?.leads,
  );
  const leadsDetail = useSelector(
    (state: RootState) => state.leads.leadsDetail,
  );
  const [id] = useState(route?.params?.slug);
  const [selectedData, setSelectedData] = useState<LeadListTypeState>(
    leadsData?.[0],
  );
  const leadAssignToData = useSelector(
    (state: RootState) => state.user.assignUserList,
  );
  const handleGetMoreServices = async () => {
    if (
      productServiceListData?.currentPage !== productServiceListData?.lastPage
    ) {
      try {
        await dispatch(
          getProductServiceListAction({
            page: productServiceListData?.currentPage + 1,
          }),
        ).unwrap();
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const data = leadsData?.filter((item) => item.id === id);
    setSelectedData(data?.[0]);
  }, [id]);
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.userRole !== UserRole.CompanyStaff;
  useEffect(() => {
    dispatch(
      addLeadInformation({
        ...addLeadFormData,
        budget: values.budget,
        timeFrame: values.timeFrame,
        selectedChannel: values?.selectedChannel,
        selectedLead: values?.selectedLead,
        selectedStage: values?.selectedStage,
        selectedServices: values?.selectedServices,
        dealAmount: values.dealAmount,
        winCloseReason: values.winCloseReason,
        dealCloseDate: values?.dealCloseDate
          ? moment(values.dealCloseDate).format('YYYY-MM-DD')
          : '',
        comments: values.comments,
        budgetCurrencyCode: values?.budgetCurrencyCode,
        dealAmountCurrencyCode: values?.dealAmountCurrencyCode,
      }),
    );
  }, [values]);

  useEffect(() => {
    form.change(
      'selectedChannel',
      id ? leadsDetail?.leadChannelId : addLeadFormData?.selectedChannel,
    );

    form.change(
      'budgetCurrencyCode',
      id ? leadsDetail?.leadChannelId : addLeadFormData?.budgetCurrencyCode,
    );
    form.change(
      'dealAmountCurrencyCode',
      id ? leadsDetail?.leadChannelId : addLeadFormData?.dealAmountCurrencyCode,
    );
    form.change(
      'selectedLead',
      id ? leadsDetail?.leadStatusId : addLeadFormData?.selectedLead,
    );
    form.change(
      'selectedStage',
      id ? leadsDetail?.leadConversionId : addLeadFormData?.selectedStage,
    );
    form.change(
      'assignTo',
      id ? leadsDetail?.assignTo : addLeadFormData?.assignTo,
    );
    form.change(
      'selectedServices',
      id
        ? leadsDetail?.productService?.map((item) => item?.id)
        : addLeadFormData?.selectedServices,
    );

    form.change(
      'budget',
      id ? `${leadsDetail?.budget || ''}` : `${addLeadFormData?.budget || ''}`,
    );
    form.change(
      'comments',
      id ? leadsDetail?.description : addLeadFormData?.comments,
    );

    form.change(
      'timeFrame',
      id ? leadsDetail?.timeLine : addLeadFormData?.timeFrame,
    );
    form.change(
      'winCloseReason',
      id
        ? leadsDetail?.winCloseReason || ''
        : addLeadFormData?.winCloseReason || '',
    );
    form.change(
      'dealAmount',
      id
        ? `${leadsDetail?.dealAmount || ''}`
        : `${addLeadFormData?.dealAmount || ''}`,
    );
    form.change(
      'dealCloseDate',
      id ? leadsDetail?.dealCloseDate : addLeadFormData?.dealCloseDate,
    );
  }, [id]);

  const handleDeleteService = (deleteId: number) => {
    const updatedServices = values?.selectedServices?.filter(
      (service) => service !== deleteId,
    );
    form.change('selectedServices', updatedServices);
  };
  const renderSelectedServices = ({ item }) => {
    return (
      <SelectedServiceData>
        <ServiceText>{item.name}</ServiceText>
        <Pressable onPress={() => handleDeleteService(item.id)}>
          <CrossSmallIcon />
        </Pressable>
      </SelectedServiceData>
    );
  };
  return (
    <FormsView>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <View>
          <ServiceLabel>{`${t('sourceLabel')} *`}</ServiceLabel>
          <LabelDescriptionText>
            {t('servicedDescription')}
          </LabelDescriptionText>
          <Spacer size={8} />
          <Field
            component={FieldDropDown}
            name={'selectedServices'}
            listData={servicesData?.map((item: any) => {
              return {
                id: item?.id,
                title: item?.name,
              };
            })}
            placeholder={`${t('searchService')}`}
            isMultiple
            isFullWidth
            isSearch
            dropdownDataType={DropdownDataType.SERVICES}
          />
          <Spacer size={8} />
          {values?.selectedServices?.length > 0 && (
            <ShowMultipleDataList
              data={servicesData?.filter((item) =>
                values?.selectedServices?.includes(item.id),
              )}
              renderItem={renderSelectedServices}
              keyExtractor={(item, index) => `${item}-${index}`}
              ItemSeparatorComponent={<Spacer size={8} />}
            />
          )}
          <Spacer size={16} />
          <Label>{`${tl('leadChannel')} *`}</Label>
          <Field
            component={FieldDropDown}
            listData={general.leadChannelList?.map((item) => {
              return {
                id: item.id,
                title: item?.name,
              };
            })}
            placeholder={tl('leadChannel')}
            name="selectedChannel"
            dropDownTitle={`${tl('leadChannel')} ${t('list')}`}
            isStaff={!isAdmin && id}
          />
          <Spacer size={16} />
          <Label>{`${tl('leadStatus')} *`}</Label>
          <Field
            component={FieldDropDown}
            name="selectedLead"
            listData={general.leadStatusList?.map((item) => {
              return {
                id: item.id,
                title: item?.name,
              };
            })}
            placeholder={tl('leadStatus')}
            dropDownTitle={`${tl('leadStatus')} ${t('list')}`}
          />
          <Spacer size={16} />
          <Label>{`${tl('LeadStage')} *`}</Label>
          <Field
            name="selectedStage"
            listData={general.leadConversionList?.map((item) => {
              return {
                id: item.id,
                title: item?.name,
              };
            })}
            placeholder={tl('LeadStage')}
            component={FieldDropDown}
            dropDownTitle={`${tl('LeadStage')} ${t('list')}`}
          />
          <Spacer size={16} />
          <Label>{`${tl('assignTo')}`}</Label>
          <Field
            component={FieldDropDown}
            name="assignTo"
            listData={leadAssignToData}
            placeholder={td('searchUsers')}
            isSearch
            dropdownDataType={DropdownDataType.USERS}
          />
          <Spacer size={16} />
          <Label>{t('budgetLabel')}</Label>
          <RowView>
            <DropdownView>
              <Field
                name={'budgetCurrencyCode'}
                component={FieldDropDown}
                listData={currencyList?.map((item) => {
                  return {
                    id: item.id,
                    title: item.currencyCodeAlpha,
                  };
                })}
                isShowSelected
                placeholder={t('budget')}
              />
            </DropdownView>
            <InputView>
              <Field
                name="budget"
                placeholder={t('budgetLabelPlaceholder')}
                component={FieldTextInput}
                keyboardType="numeric"
                isFloatValue
                validate={composeValidators(numberAndFractionalNumberValidator)}
              />
            </InputView>
          </RowView>
          <Spacer size={16} />
          <Label>{t('timeFrameToPurchaseLabel')}</Label>
          <RowView>
            <DropdownView>
              <Field
                name={'timeFrame'}
                component={FieldDropDown}
                listData={Object.entries(settings?.timeframe).map(
                  ([key, value]) => ({
                    id: key,
                    title: value,
                  }),
                )}
                isShowSelected
                placeholder={t('timeFrameToPurchaseLabel')}
              />
            </DropdownView>
            <InputView>
              <Field
                name="timeFrame"
                placeholder={t('timeFrame')}
                component={FieldTextInput}
              />
            </InputView>
          </RowView>
          <Spacer size={16} />
          <Label>{t('commentsLabel')}</Label>
          <Field
            name="comments"
            placeholder={t('commentsLabel')}
            component={FieldTextInput}
            numberOfLines={5}
            style={{
              height: 85,
              backgroundColor: colors?.transparent,
            }}
            multiline
            contentStyle={{ marginTop: -10 }}
          />
          <Spacer size={16} />
          {(values?.selectedStage === LeadStageType.CLOSELOST ||
            values?.selectedStage === LeadStageType.CLOSEWON) && (
            <>
              <Label>{t('winCloseReason')}</Label>
              <Field
                name="winCloseReason"
                placeholder={t('winCloseReason')}
                component={FieldTextInput}
              />
              <Spacer size={16} />
              <Label>{t('dealCloseDate')}</Label>
              <Field
                name="dealCloseDate"
                component={FieldDatePicker}
                initialDate={values?.dealCloseDate || moment().clone().toDate()}
              />
              <Spacer size={16} />
              <Label>{t('dealAmount')}</Label>
              <RowView>
                <DropdownView>
                  <Field
                    name={'dealAmountCurrencyCode'}
                    component={FieldDropDown}
                    listData={currencyList?.map((item) => {
                      return {
                        id: item.id,
                        title: item.currencyCodeAlpha,
                      };
                    })}
                    isShowSelected
                    placeholder={t('Amount')}
                  />
                </DropdownView>
                <InputView>
                  <Field
                    name="dealAmount"
                    placeholder={t('dealAmount')}
                    component={FieldTextInput}
                    keyboardType="numeric"
                    isFloatValue
                    validate={composeValidators(
                      numberAndFractionalNumberValidator,
                    )}
                  />
                </InputView>
              </RowView>
              <Spacer size={16} />
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
      <ContainerView>
        <SubContainerView>
          <ButtonSubmit onPress={() => onBackClick?.()} valid={true}>
            <FormButtonText valid={true}>{tb('previous')}</FormButtonText>
          </ButtonSubmit>
        </SubContainerView>
        <SubContainerView>
          <ButtonSubmit
            onPress={
              values?.selectedServices?.length > 0 &&
              values?.selectedChannel &&
              values?.selectedLead &&
              values?.selectedStage &&
              !loading &&
              form.submit
            }
            loading={loading}
            valid={
              valid &&
              values?.selectedServices?.length > 0 &&
              values?.selectedChannel &&
              values?.selectedLead &&
              values?.selectedStage
            }>
            <FormButtonText
              valid={
                valid &&
                values?.selectedServices?.length > 0 &&
                values?.selectedChannel &&
                values?.selectedLead &&
                values?.selectedStage
              }>
              {id ? tb('save') : tb('next')}
            </FormButtonText>
          </ButtonSubmit>
        </SubContainerView>
      </ContainerView>
    </FormsView>
  );
};

export default LeadDetailsForm;
