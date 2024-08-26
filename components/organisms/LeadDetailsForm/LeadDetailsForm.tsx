import { Spacer } from '@atoms/common/common.styles';
import FieldTextInput from '@molecules/FieldTextInput/FieldTextInput';
import { Label } from '@organisms/BasicInformatioForm/BasicInformationForm.styles';
import {
  composeValidators,
  numberAndFractionalNumberValidator,
} from '@utils/formValidators';
import React, { useEffect, useState } from 'react';
import { Field, useFormState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LeadDetailsFormProps } from './LeadDetailsForm.props';
import { FormsView } from './LeadDetailsForm.styles';
import View from '@atoms/View/View';
import { dropdownData } from '@constants/dummyData';
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
import { userRole } from '@type/api/auth';
import { useAppTheme } from '@constants/theme';
import { LeadStageType } from '@organisms/LeadDetailCard/LeadDetailCard.props';
import { getProductServiceListAction } from '@redux/actions/productService';
import DropDown from '@molecules/DropDown/DropDown';
import FieldDropDown from '@organisms/FieldDropDown/FieldDropdown';

const LeadDetailsForm: React.FC<LeadDetailsFormProps> = ({
  form,
  loading,
  isSave,
  onBackClick,
  setSourceValue,
  sourceValue,
  setSelectedChannel,
  selectedChannel,
  setSelectedLead,
  selectedLead,
  selectedStage,
  setSelectedStage,
  setSelectedService,
  selectedService,
  assignTo,
  setAssignTo,
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
  const general = useSelector((state: RootState) => state.general);
  const servicesData = useSelector(
    (state: RootState) => state.productService.productServiceList?.serviceList,
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
    handleGetMoreServices();
  }, [productServiceListData]);
  useEffect(() => {
    const data = leadsData?.filter((item) => item.id === id);
    setSelectedData(data?.[0]);
  }, [id]);
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.userRole !== userRole.CompanyStaff;
  useEffect(() => {
    dispatch(
      addLeadInformation({
        ...addLeadFormData,
        budget: values.budget,
        timeFrame: values.timeFrame,
        selectedChannel: selectedChannel,
        selectedLead: selectedLead,
        selectedStage: selectedStage,
        selectedServices: selectedService,
        dealAmount: values.dealAmount,
        winCloseReason: values.winCloseReason,
        dealCloseDate: values?.dealCloseDate
          ? moment(values.dealCloseDate).format('YYYY-MM-DD')
          : '',
        comments: values.comments,
      }),
    );
  }, [values, selectedService, selectedChannel, selectedLead, selectedStage]);

  useEffect(() => {
    form.change(
      'selectedChannel',
      id ? leadsDetail?.leadChannelId : addLeadFormData?.selectedChannel,
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

    setSelectedService(
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

  return (
    <FormsView>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <View>
          <Label>{`${t('sourceLabel')} *`}</Label>
          <DropDown
            data={servicesData?.map((item: any) => {
              return {
                id: item?.id,
                title: item?.name,
              };
            })}
            placeholder={`${t('sourceLabel')}`}
            value={selectedService || []}
            isMultiple
            onChange={(item: number[]) => {
              if (selectedService?.includes(item)) {
                const updatedServices = selectedService.filter(
                  (service) => service !== item,
                );
                setSelectedService(updatedServices);
              } else {
                setSelectedService([...selectedService, item]);
              }
            }}
            isFullWidth
            dropDownTitle={`${t('sourceLabel')} ${t('list')}`}
          />
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
            placeholder={tl('assignTo')}
            dropDownTitle={`${tl('assignTo')} ${t('list')}`}
            dataToShow={leadAssignToData?.filter(
              (item) => item.id !== assignTo,
            )}
            isDataToShow
          />
          <Spacer size={16} />
          <Label>{t('budgetLabel')}</Label>
          <Field
            name="budget"
            placeholder={t('budgetLabelPlaceholder')}
            component={FieldTextInput}
            keyboardType="numeric"
            isFloatValue
            validate={composeValidators(numberAndFractionalNumberValidator)}
          />
          <Spacer size={16} />
          <Label>{t('timeFrameToPurchaseLabel')}</Label>
          <Field
            name="timeFrame"
            placeholder={t('timeFrameToPurchaseEg')}
            component={FieldTextInput}
          />
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
          {(selectedStage === LeadStageType.CLOSELOST ||
            selectedStage === LeadStageType.CLOSEWON) && (
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
              <Field
                name="dealAmount"
                placeholder={t('dealAmount')}
                component={FieldTextInput}
                keyboardType="numeric"
                isFloatValue
                validate={composeValidators(numberAndFractionalNumberValidator)}
              />
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
              selectedService?.length > 0 &&
              values?.selectedChannel &&
              values?.selectedLead &&
              values?.selectedStage &&
              !loading &&
              form.submit
            }
            loading={loading}
            valid={
              valid &&
              selectedService?.length > 0 &&
              values?.selectedChannel &&
              values?.selectedLead &&
              values?.selectedStage
            }>
            <FormButtonText
              valid={
                valid &&
                selectedService?.length > 0 &&
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
