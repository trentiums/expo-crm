import React, { useEffect } from 'react';
import {
  ApplyFiltersContainer,
  DateContainer,
  DateFilterContainer,
  FilterBtnText,
  FilterFormView,
  FiltersDropDownViews,
  LeadsFilterFormContainer,
  RemoveFilterBtnText,
  RemoveFiltersContainer,
} from './LeadsFilterForm.styles';
import { Field, useFormState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { Label } from '@organisms/UserInformationForm/UserInformationForm.styles';
import FieldDatePicker from '@molecules/FieldDatePicker/FieldDatePicker';
import moment from 'moment';
import DropDown from '@molecules/DropDown/DropDown';
import { RootState, useAppDispatch, useSelector } from '@redux/store';
import { Spacer } from '@atoms/common/common.styles';
import { orderByList, sortOrderList } from '../../../constant';
import { LeadFilterFormProps } from './LeadsFilterForm.props';
import { endOfDay } from 'date-fns';
import { getLeadListAction } from '@redux/actions/lead';
import Button from '@atoms/Button/Button';
import { useAppTheme } from '@constants/theme';

const LeadsFilterForm: React.FC<LeadFilterFormProps> = ({
  form,
  selectedChannel,
  setSelectedChannel,
  selectedLead,
  setSelectedLead,
  selectedStage,
  setSelectedStage,
  orderBy,
  setOrderBy,
  sortBy,
  setSortBy,
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

  useEffect(() => {
    form.change('startDate', startDate);
    form.change('endDate', endDate);
  }, []);
  const handleGetLeadList = async () => {
    await dispatch(getLeadListAction({ page: 1 }));
  };
  const handleRemoveFilters = () => {
    setStartDate();
    setEndDate();
    setSelectedChannel();
    setSelectedStage();
    setSelectedLead();
    setSortBy();
    setOrderBy();
    form.change('startDate', '');
    form.change('endDate', '');
    handleGetLeadList();
    handleDropDownClose();
    setFilterCount(0);
    bottomSheetClose();
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
          <DropDown
            data={orderByList}
            placeholder={t('orderBy')}
            value={orderBy}
            onChange={(value: any) => {
              if (orderBy === value) {
                setOrderBy();
              } else {
                setOrderBy(value);
              }
            }}
            dropDownTitle={`${t('orderBy')} ${t('list')}`}
            handleBottomSheetClose={handleDropDownClose}
          />
          <Spacer size={16} />
          <Label>{`${t('sortOrder')}`}</Label>
          <DropDown
            data={sortOrderList}
            placeholder={t('sortOrder')}
            value={sortBy}
            onChange={(value: any) => {
              if (sortBy === value) {
                setSortBy();
              } else {
                setSortBy(value);
              }
            }}
            dropDownTitle={`${t('sortOrder')} ${t('list')}`}
            handleBottomSheetClose={handleDropDownClose}
          />
          <Spacer size={16} />
          <Label>{`${t('channel')}`}</Label>
          <DropDown
            data={general.leadChannelList?.map((item) => {
              return {
                id: item.id,
                title: item?.name,
              };
            })}
            placeholder={t('channel')}
            value={selectedChannel}
            onChange={(value: any) => {
              if (selectedChannel === value) {
                setSelectedChannel();
              } else {
                setSelectedChannel(value);
              }
            }}
            dropDownTitle={`${t('channel')} ${t('list')}`}
            handleBottomSheetClose={handleDropDownClose}
          />
          <Spacer size={16} />
          <Label>{`${t('status')}`}</Label>
          <DropDown
            data={general.leadStatusList?.map((item) => {
              return {
                id: item.id,
                title: item?.name,
              };
            })}
            placeholder={t('status')}
            value={selectedLead}
            onChange={(value: any) => {
              if (selectedLead === value) {
                setSelectedLead();
              } else {
                setSelectedLead(value);
              }
            }}
            dropDownTitle={`${t('status')} ${t('list')}`}
            handleBottomSheetClose={handleDropDownClose}
          />
          <Spacer size={16} />
          <Label>{`${t('conversion')}`}</Label>
          <DropDown
            data={general.leadConversionList?.map((item) => {
              return {
                id: item.id,
                title: item?.name,
              };
            })}
            placeholder={t('conversion')}
            value={selectedStage}
            onChange={(value: any) => {
              if (selectedStage === value) {
                setSelectedStage();
              } else {
                setSelectedStage(value);
              }
            }}
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
