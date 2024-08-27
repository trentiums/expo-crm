import React, { useEffect } from 'react';
import {
  DateContainer,
  DateFilterContainer,
  FilterFormView,
  FiltersDropDownViews,
  LeadsFilterFormContainer,
} from './LeadsFilterForm.styles';
import { Field, useFormState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { Label } from '@organisms/UserInformationForm/UserInformationForm.styles';
import FieldDatePicker from '@molecules/FieldDatePicker/FieldDatePicker';
import moment from 'moment';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import { Spacer } from '@atoms/common/common.styles';
import { orderByList, sortOrderList } from '../../../constant';
import { LeadFilterFormProps } from './LeadsFilterForm.props';
import { getLeadListAction } from '@redux/actions/lead';
import Button from '@atoms/Button/Button';
import { useAppTheme } from '@constants/theme';
import FieldDropDown from '@organisms/FieldDropDown/FieldDropdown';
import { setLeadsFilters } from '@redux/slices/leads';

const LeadsFilterForm: React.FC<LeadFilterFormProps> = ({
  form,
  handleDropDownClose,
  loading,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  bottomSheetClose,
  setFilterCount,
}) => {
  const { t } = useTranslation('leadsFilter');
  const { values } = useFormState();
  const general = useSelector((state: RootState) => state.general);
  const dispatch = useAppDispatch();
  const { colors } = useAppTheme();
  useEffect(() => {
    setStartDate(values.startDate);
    setEndDate(values.endDate);
  }, [values]);
  const leadsFilter = useSelector(
    (state: RootState) => state.leads.leadsFilter,
  );

  useEffect(() => {
    form.change('startDate', leadsFilter?.startDate);
    form.change('endDate', leadsFilter?.endDate);
    form.change('orderBy', leadsFilter?.orderBy);
    form.change('sortBy', leadsFilter?.sortBy);
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
    handleDropDownClose();
    setFilterCount(0);
    bottomSheetClose();
    dispatch(setLeadsFilters({}));
  };
  return (
    <LeadsFilterFormContainer>
      <FilterFormView>
        <DateFilterContainer>
          <DateContainer>
            <Label>{t('startDate')}</Label>
            <Field
              name="startDate"
              component={FieldDatePicker}
              initialDate={
                values?.startDate || startDate || moment().clone().toDate()
              }
              maxDate={endDate || moment().startOf('day').toDate()}
            />
          </DateContainer>
          <DateContainer>
            <Label>{t('endDate')}</Label>
            <Field
              name="endDate"
              component={FieldDatePicker}
              initialDate={
                values?.endDate || endDate || moment().clone().toDate()
              }
              minDate={startDate}
              maxDate={moment().startOf('day').toDate()}
            />
          </DateContainer>
        </DateFilterContainer>
        <FiltersDropDownViews>
          <Spacer size={16} />
          <Label>{`${t('orderBy')}`}</Label>
          <Field
            component={FieldDropDown}
            listData={orderByList}
            placeholder={t('orderBy')}
            name={'orderBy'}
            dropDownTitle={`${t('orderBy')} ${t('list')}`}
            handleBottomSheetClose={handleDropDownClose}
          />
          <Spacer size={16} />
          <Label>{`${t('sortOrder')}`}</Label>
          <Field
            name={'sortBy'}
            listData={sortOrderList}
            component={FieldDropDown}
            placeholder={t('sortOrder')}
            dropDownTitle={`${t('sortOrder')} ${t('list')}`}
            handleBottomSheetClose={handleDropDownClose}
            isStaff={!values?.orderBy}
          />
          <Spacer size={16} />
          <Label>{`${t('channel')}`}</Label>
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
            handleBottomSheetClose={handleDropDownClose}
          />
          <Spacer size={16} />
          <Label>{`${t('status')}`}</Label>
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
            handleBottomSheetClose={handleDropDownClose}
          />
          <Spacer size={16} />
          <Label>{`${t('conversion')}`}</Label>
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
            handleBottomSheetClose={handleDropDownClose}
          />
          <Spacer size={16} />
        </FiltersDropDownViews>
      </FilterFormView>
      <Button
        mode="contained"
        buttonColor={colors.primaryColor}
        textColor={colors.white}
        onPress={form.submit}
        uppercase={false}
        loading={loading}>
        {t('applyFilter')}
      </Button>
      <Button
        mode="text"
        textColor={colors.errorText}
        uppercase={false}
        onPress={handleRemoveFilters}>
        {t('removeFilter')}
      </Button>
    </LeadsFilterFormContainer>
  );
};

export default LeadsFilterForm;
