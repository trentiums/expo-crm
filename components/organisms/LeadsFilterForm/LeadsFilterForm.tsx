import React, { useEffect } from 'react';
import {
  DateContainer,
  DateFilterContainer,
  FilterApplyButton,
  FilterFormView,
  FiltersDropDownViews,
  LeadsFilterButton,
  LeadsFilterFormContainer,
  RemoveButtonText,
  RemoveFilterButton,
} from './LeadsFilterForm.styles';
import { Field, useFormState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import {
  FormButtonText,
  Label,
} from '@organisms/UserInformationForm/UserInformationForm.styles';
import FieldDatePicker from '@molecules/FieldDatePicker/FieldDatePicker';
import moment from 'moment';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import { Spacer } from '@atoms/common/common.styles';
import { LeadFilterFormProps } from './LeadsFilterForm.props';
import { getLeadListAction } from '@redux/actions/lead';
import FieldDropDown from '@organisms/FieldDropDown/FieldDropdown';
import { setLeadsFilters } from '@redux/slices/leads';

const LeadsFilterForm: React.FC<LeadFilterFormProps> = ({
  form,
  loading,
  changeRoute,
}) => {
  const { t } = useTranslation('leadsFilter');
  const { values } = useFormState();
  const general = useSelector((state: RootState) => state.general);
  const dispatch = useAppDispatch();
  const leadsFilter = useSelector(
    (state: RootState) => state.leads.leadsFilter,
  );

  useEffect(() => {
    form.change('startDate', leadsFilter?.startDate);
    form.change('endDate', leadsFilter?.endDate);
    form.change('selectedChannel', leadsFilter?.selectedChannel);
    form.change('selectedStatus', leadsFilter?.selectedStatus);
    form.change('selectedStage', leadsFilter?.selectedStage);
  }, []);
  const handleGetLeadList = async () => {
    await dispatch(getLeadListAction({ page: 1 }));
  };
  const handleRemoveFilters = () => {
    form.reset();
    handleGetLeadList();
    dispatch(setLeadsFilters({}));
    changeRoute();
  };
  useEffect(() => {
    if (!values?.orderBy) {
      form.change('sortBy', undefined);
    }
  }, [values.orderBy]);
  return (
    <LeadsFilterFormContainer>
      <FilterFormView>
        <DateFilterContainer>
          <DateContainer>
            <Label variant="SF-Pro-Display-Medium_500">{t('startDate')}</Label>
            <Field
              name="startDate"
              component={FieldDatePicker}
              initialDate={values?.startDate || moment().clone().toDate()}
              maxDate={values?.endDate || moment().startOf('day').toDate()}
            />
          </DateContainer>
          <DateContainer>
            <Label variant="SF-Pro-Display-Medium_500">{t('endDate')}</Label>
            <Field
              name="endDate"
              component={FieldDatePicker}
              initialDate={values?.endDate || moment().clone().toDate()}
              minDate={values?.startDate}
              maxDate={moment().startOf('day').toDate()}
            />
          </DateContainer>
        </DateFilterContainer>
        <FiltersDropDownViews>
          <Spacer size={16} />
          <Label variant="SF-Pro-Display-Medium_500">{`${t('channel')}`}</Label>
          <Field
            name={'selectedChannel'}
            component={FieldDropDown}
            listData={general.leadChannelList?.map((item) => {
              return {
                id: item.id,
                title: item?.name,
              };
            })}
            placeholder={t('channel')}
            dropDownTitle={`${t('channel')} ${t('list')}`}
            isAllowDeselect
            isMultiple
          />
          <Spacer size={16} />
          <Label variant="SF-Pro-Display-Medium_500">{`${t('status')}`}</Label>
          <Field
            name={'selectedStatus'}
            component={FieldDropDown}
            listData={general.leadStatusList?.map((item) => {
              return {
                id: item.id,
                title: item?.name,
              };
            })}
            placeholder={t('status')}
            dropDownTitle={`${t('status')} ${t('list')}`}
            isAllowDeselect
            isMultiple
          />
          <Spacer size={16} />
          <Label variant="SF-Pro-Display-Medium_500">{`${t(
            'conversion',
          )}`}</Label>
          <Field
            component={FieldDropDown}
            name={'selectedStage'}
            listData={general.leadConversionList?.map((item) => {
              return {
                id: item.id,
                title: item?.name,
              };
            })}
            placeholder={t('conversion')}
            dropDownTitle={`${t('conversion')} ${t('list')}`}
            isAllowDeselect
            isMultiple
          />
          <Spacer size={16} />
        </FiltersDropDownViews>
      </FilterFormView>
      <LeadsFilterButton>
        <RemoveFilterButton onPress={handleRemoveFilters}>
          <RemoveButtonText variant="SF-Pro-Display-Semibold_600">
            {t('removeFilter')}
          </RemoveButtonText>
        </RemoveFilterButton>
        <FilterApplyButton loading={loading} onPress={!loading && form.submit}>
          <FormButtonText valid={true} variant="SF-Pro-Display-Semibold_600">
            {t('applyFilter')}
          </FormButtonText>
        </FilterApplyButton>
      </LeadsFilterButton>
    </LeadsFilterFormContainer>
  );
};

export default LeadsFilterForm;
