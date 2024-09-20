import { Spacer } from '@atoms/common/common.styles';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import { Label } from '@organisms/BasicInformationForm/BasicInformationForm.styles';
import {
  composeValidators,
  numberAndFractionalNumberValidator,
  requiredValidator,
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
  SelectedUserData,
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
  BackButton,
  BackButtonText,
  ButtonSubmit,
  ContainerView,
  FormButtonText,
  SubContainerView,
} from '@organisms/CompanyInformationForm/CompanyInformationForm.styles';
import { addLeadInformation } from '@redux/slices/leads';
import { UserRole } from '@type/api/auth';
import { useAppTheme } from '@constants/theme';
import { LeadStageType } from '@organisms/LeadDetailCard/LeadDetailCard.props';
import FieldDropDown from '@organisms/FieldDropDown/FieldDropdown';
import { Pressable } from 'react-native';
import { ShowMultipleDataList } from '@molecules/DropDown/DropDown.styles';
import CrossSmallIcon from '@atoms/Illustrations/CrossSmall';
import { DropdownDataType } from '@organisms/FieldDropDown/FieldDropDown.props';
import { getLeadProductServiceListAction } from '@redux/actions/productService';
import { getAssignUserListAction } from '@redux/actions/user';
import ProfileIcon from '@atoms/Illustrations/Profile';

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
    (state: RootState) => state.productService.leadProductService,
  );
  const currencyList = useSelector(
    (state: RootState) => state.general.currencyList,
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
    (state: RootState) => state.user.assignUserList?.assignUsers,
  );

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
        timeFrameType: values?.timeFrameType,
      }),
    );
  }, [values]);

  useEffect(() => {
    handleGetLeadsServices();
    form.change(
      'selectedChannel',
      id ? leadsDetail?.leadChannelId : addLeadFormData?.selectedChannel,
    );

    form.change(
      'budgetCurrencyCode',
      id
        ? leadsDetail?.budgetCurrencyCode
        : addLeadFormData?.budgetCurrencyCode,
    );
    form.change(
      'dealAmountCurrencyCode',
      id
        ? leadsDetail?.dealAmountCurrencyCode
        : addLeadFormData?.dealAmountCurrencyCode,
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
    form.change(
      'timeFrameType',
      id
        ? `${leadsDetail?.timeFrameType || ''}`
        : addLeadFormData?.timeFrameType,
    );
  }, [id]);
  const handleGetLeadsServices = async () => {
    await dispatch(getLeadProductServiceListAction());
    await dispatch(getAssignUserListAction({}));
  };
  const handleDeleteService = (deleteId: number) => {
    const updatedServices = values?.selectedServices?.filter(
      (service) => service !== deleteId,
    );
    form.change('selectedServices', updatedServices);
  };
  const handleDeleteAssignedUser = (deleteId: number) => {
    form.change('assignTo', null);
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
  const renderSelectedUsers = ({ item }) => {
    return (
      <SelectedUserData>
        <ProfileIcon color={colors?.black} />
        <ServiceText>{item.title}</ServiceText>
        {!id && (
          <Pressable onPress={() => handleDeleteAssignedUser(item.id)}>
            <CrossSmallIcon />
          </Pressable>
        )}
      </SelectedUserData>
    );
  };

  return (
    <FormsView>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <View>
          <ServiceLabel variant="SF-Pro-Display-Medium_500">{`${t(
            'sourceLabel',
          )} *`}</ServiceLabel>
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
            heading={t('selectService')}
            validate={requiredValidator}
          />
          <Spacer size={8} />
          {values?.selectedServices?.length > 0 && (
            <ShowMultipleDataList
              data={servicesData?.filter((item) =>
                values.selectedServices.includes(item.id),
              )}
              renderItem={renderSelectedServices}
              keyExtractor={(item, index) => `${item}-${index}`}
              ItemSeparatorComponent={<Spacer size={8} />}
            />
          )}
          <Spacer size={16} />
          <Label variant="SF-Pro-Display-Medium_500">{`${tl(
            'leadChannel',
          )} *`}</Label>
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
            validate={requiredValidator}
          />
          <Spacer size={16} />
          <Label variant="SF-Pro-Display-Medium_500">{`${tl(
            'leadStatus',
          )} *`}</Label>
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
            validate={requiredValidator}
          />
          <Spacer size={16} />
          <Label variant="SF-Pro-Display-Medium_500">{`${tl(
            'LeadStage',
          )} *`}</Label>
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
            validate={requiredValidator}
          />
          <Spacer size={16} />
          <Label variant="SF-Pro-Display-Medium_500">{`${tl(
            'assignTo',
          )}`}</Label>
          <Field
            component={FieldDropDown}
            name="assignTo"
            listData={leadAssignToData}
            placeholder={tl('assignToEg')}
            isSearch
            dropdownDataType={DropdownDataType.USERS}
            heading={t('selectUser')}
          />
          <Spacer size={8} />
          {values?.assignTo && (
            <ShowMultipleDataList
              data={leadAssignToData?.filter(
                (item) => values?.assignTo === item.id,
              )}
              renderItem={renderSelectedUsers}
              keyExtractor={(item, index) => `${item}-${index}`}
              ItemSeparatorComponent={<Spacer size={8} />}
            />
          )}
          <Spacer size={16} />
          <Label variant="SF-Pro-Display-Medium_500">{t('budgetLabel')}</Label>
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
                dropdownDataType={DropdownDataType.BUDGET}
                placeholder={t('budget')}
                heading={t('selectBudget')}
              />
            </DropdownView>
            <InputView>
              <Field
                name="budget"
                placeholder={tl('budgetEg')}
                component={FieldTextInput}
                keyboardType="numeric"
                isFloatValue
                validate={composeValidators(numberAndFractionalNumberValidator)}
              />
            </InputView>
          </RowView>
          <Spacer size={16} />
          <Label variant="SF-Pro-Display-Medium_500">
            {t('timeFrameToPurchaseLabel')}
          </Label>
          <RowView>
            <DropdownView>
              <Field
                name={'timeFrameType'}
                component={FieldDropDown}
                listData={Object?.entries(settings?.timeframe).map(
                  ([key, value]) => ({
                    id: key,
                    title: value,
                  }),
                )}
                isShowSelected
                placeholder={t('time')}
                dropdownDataType={DropdownDataType.TIMELINE}
                heading={t('selectTimeline')}
              />
            </DropdownView>
            <InputView>
              <Field
                name="timeFrame"
                placeholder={`${tl('timeFrameEg')} ${
                  settings?.timeframe[
                    values?.timeFrameType as string
                  ]?.toLowerCase() || ''
                }`}
                component={FieldTextInput}
                keyboardType="numeric"
              />
            </InputView>
          </RowView>
          <Spacer size={16} />
          <Label variant="SF-Pro-Display-Medium_500">
            {t('commentsLabel')}
          </Label>
          <Field
            name="comments"
            placeholder={t('commentsEg')}
            component={FieldTextInput}
            numberOfLines={5}
            style={{
              height: 85,
              backgroundColor: colors?.iceWindDale,
            }}
            multiline
            contentStyle={{ marginTop: -10 }}
          />
          <Spacer size={16} />
          {(values?.selectedStage === LeadStageType.CLOSELOST ||
            values?.selectedStage === LeadStageType.CLOSEWON) && (
            <>
              <Label variant="SF-Pro-Display-Medium_500">
                {t('winCloseReason')}
              </Label>
              <Field
                name="winCloseReason"
                placeholder={t('winCloseReason')}
                component={FieldTextInput}
              />
              <Spacer size={16} />
              <Label variant="SF-Pro-Display-Medium_500">
                {t('dealCloseDate')}
              </Label>
              <Field
                name="dealCloseDate"
                component={FieldDatePicker}
                initialDate={values?.dealCloseDate || moment().clone().toDate()}
              />
              <Spacer size={16} />
              <Label variant="SF-Pro-Display-Medium_500">
                {t('dealAmount')}
              </Label>
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
                    dropdownDataType={DropdownDataType.BUDGET}
                    heading={t('selectDealAmount')}
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
          <BackButton
            onPress={() => onBackClick?.()}
            valid={false}
            variant="SF-Pro-Display-Semibold_600">
            <BackButtonText valid={true}>{tb('previous')}</BackButtonText>
          </BackButton>
        </SubContainerView>
        <SubContainerView>
          <ButtonSubmit
            onPress={
              !loading &&
              valid &&
              values?.selectedServices?.length > 0 &&
              form.submit
            }
            loading={loading}
            valid={valid && values?.selectedServices?.length > 0}>
            <FormButtonText
              valid={valid && values?.selectedServices?.length > 0}
              variant="SF-Pro-Display-Semibold_600">
              {id ? tb('save') : tb('complete')}
            </FormButtonText>
          </ButtonSubmit>
        </SubContainerView>
      </ContainerView>
    </FormsView>
  );
};

export default LeadDetailsForm;
